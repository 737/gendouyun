# 部署手册（VPS / Ubuntu 24.04）

> 重装时只看命令：[一页速查](CHEATSHEET.md)

服务器整体架构

```
VPS / Ubuntu 24.04
├─ Caddy ── TCP 80/443
│   ├─ 80/tcp   ← 浏览器：ACME 验证 + 308 跳转 https
│   ├─ 443/tcp  ← 浏览器：TLS 终止 → reverse_proxy → Node 24 (127.0.0.1:3000)
│   │              Node 只监听回环，公网进不来
│   └─ handle_path /sub/*  →  磁盘 /srv/sub/（剥掉 /sub 前缀，不限扩展名）
│          URL /sub/a.yaml  ⇒  文件 /srv/sub/a.yaml
│
├─ Hysteria2 ── UDP 443（QUIC）← 代理客户端，出口到互联网
│   └─ TLS 证书复用 Caddy 签发的那张（timer 每 6h 同步副本）
│
└─ ufw / fail2ban / BBR / systemd
```

> 同一个 443 端口被两个服务共用：TCP 给 Caddy，UDP 给 Hysteria2，互不冲突。

---

## 部署步骤

- [x] 第 1 步：域名解析
- [x] 第 2 步：系统底座
- [x] 第 3 步：Caddy
- [x] 第 4 步：Node 24 + 应用
- [x] 第 5 步：Hysteria2
- [ ] 第 6 步：ufw / fail2ban / BBR 收尾

---

## 第 1 步：域名解析（ename 加 A 记录）

> 目标：把 `gendouyun.cn` 和 `www.gendouyun.cn` 都指向 VPS 公网 IP。
> 这一步放在最前面，因为 DNS 生效要等 1–3 分钟到几小时，可以**一边等解析一边做第 2 步**，不浪费停机时间。

### 加 A 记录

域名列表 → `gendouyun.cn` → 点「解析」。加两条：

| 主机记录 | 记录类型 | 线路 | 记录值 | TTL |
| --- | --- | --- | --- | --- |
| `@` | A | 默认 | `vpsIp地址` | 300（或 600） |
| `www` | A | 默认 | `vpsIp地址` | 300（或 600） |

如果「主机记录」不接受 `@`，就留空；两种都试一下，保存后能显示成 `gendouyun.cn` 就对。

> `vpsIp地址` 换成这台 VPS 的公网 IP（可登录控制台查看，或在服务器上执行 `curl -4 -s https://api.ipify.org`）。

### 验证（1–3 分钟）

```bash
nslookup gendouyun.cn 223.5.5.5
nslookup www.gendouyun.cn 8.8.8.8
```

两条都返回 `vpsIp地址` → DNS 全部搞定。

### 注意事项

- 用 `223.5.5.5`（阿里）和 `8.8.8.8`（Google）各查一次，是为了绕开本地 DNS 缓存；本地查还是旧 IP 不代表没生效。
- 如果域名托在 Cloudflare 且开了橙云代理，`nslookup` 会返回 `104.x` / `172.67.x` 这类 Cloudflare IP。这种情况下要先把记录改成「仅 DNS / 灰云」，否则第 3 步 Caddy 签证书会被挡。
- TTL 填 300（5 分钟），以后换 IP 时生效快；填 600 也行，只是改记录后要多等一会儿。

---

## 第 2 步：系统底座（Ubuntu 24.04）

> 目标：把全新 VPS 的系统更新、基础工具、时区、防火墙/防爆破组件准备好。
> 本步**不安装** Caddy、Node 24、Hysteria2，也**不启用** ufw —— 等服务起来、端口确认后再开，否则容易被锁在门外。

### SSH连接
```
ssh root@ip
```

### 执行

SSH 登录新 VPS（root 或 sudo 用户），依次执行：

```bash
apt update && apt full-upgrade -y
apt install -y curl wget git unzip vim ufw fail2ban chrony
timedatectl set-timezone Asia/Shanghai
apt autoremove -y
```

### 为什么先做这一步

| 动作 | 原因 |
| --- | --- |
| `apt full-upgrade` | 先打齐 24.04 安全补丁，避免后面装 Caddy/Node 时踩依赖冲突 |
| `curl` / `git` / `unzip` | 后续装 Caddy、Node 24、Hysteria2 的必备工具（Hysteria2 官方脚本需要 curl + unzip） |
| `chrony` | 校时；TLS 证书校验与 Hysteria2 的 QUIC 握手都对时间敏感 |
| `ufw` / `fail2ban` | 先装好备用，等 443 端口全部打通后再一次性启用 |

### 注意事项

- `full-upgrade` 若弹出 `grub` / `needrestart` 交互框，直接回车用默认值（保留现有配置）。
- `needrestart` 提示重启服务时可选 "later"（稍后），最终重启放到最后一步统一做。
- 本步结束后先**不要**执行 `ufw enable`。

### 验证

```bash
head -3 /etc/os-release          # 确认 Ubuntu 24.04
date                             # 确认时区为 CST/Asia/Shanghai
command -v curl git unzip ufw fail2ban-client
```

---

## 第 3 步：Caddy（443/tcp 入口 + 自动 HTTPS）

> 目标：Caddy 监听 80/443，自动申请 Let's Encrypt 证书；`/sub/*` 走静态文件，其余全部反代到 Node 的 `127.0.0.1:3000`。

### 前提（先确认，缺一不可）

1. 域名解析已完成（第 1 步）：`nslookup www.gendouyun.cn 223.5.5.5` 应返回 VPS 公网 IP；裸域同理。

   顺手确认解析没回错地方：

   ```bash
   apt install -y dnsutils      # 没装 nslookup/dig 时先装
   nslookup gendouyun.cn 223.5.5.5
   nslookup www.gendouyun.cn 8.8.8.8
   curl -4 -s https://api.ipify.org; echo    # 本机公网 IP，应与上面两条一致
   ```

2. 云厂商**安全组**放行 `80/tcp`、`443/tcp`（80 用于证书签发 + 自动跳转，不只是 443）。
3. 本机 80/443 没被占用：`ss -lntp | grep -E ':80|:443'` 应无输出（有输出说明第 2 步装了别的 Web 服务，需先停掉）。

### 执行

**① 加官方 apt 源并安装**

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
caddy version
```

**② 建 `/sub` 静态目录（属主给 caddy，否则 403）**

```bash
install -d -o caddy -g caddy -m 755 /srv/sub
```

**③ 写 Caddyfile**（站点地址写两个域名，一张证书同时覆盖裸域和 `www`）

```bash
cat >/etc/caddy/Caddyfile <<'EOF'
gendouyun.cn, www.gendouyun.cn {
	encode zstd gzip

	# 注意：handle_path 会剥掉 /sub 前缀，所以 /sub/a.yaml -> /srv/sub/a.yaml
	handle_path /sub/* {
		root * /srv/sub
		file_server
	}

	reverse_proxy 127.0.0.1:3000
}
EOF
```

**④ 校验并启动**

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl enable --now caddy
systemctl status caddy --no-pager
```

**⑤ 观察证书签发（首次约 10–30 秒）**

```bash
journalctl -u caddy -f
# 看到 "certificate obtained successfully" 即成功，Ctrl+C 退出
```

### 验证

```bash
curl -I https://www.gendouyun.cn                  # 此时应返回 502（Node 还没起，说明反代链路已通）
echo 'ok: true' > /srv/sub/_health.yaml
curl https://www.gendouyun.cn/sub/_health.yaml    # 应返回 ok: true
curl -I https://gendouyun.cn                      # 裸域也应正常（同一张证书）
curl -I http://www.gendouyun.cn                   # 应 308 跳转到 https
rm -f /srv/sub/_health.yaml                       # 测完删掉：/sub 目录整体对公网开放
```

`502` 是这一步的**预期结果**，不是错误 —— 证明 Caddy 已经把请求转给了 3000 端口。

### 注意事项

- 证书与私钥在 `/var/lib/caddy/.local/share/caddy/`，别手工拷贝，换域名重新签即可。
- 之后启用 ufw 时记得放行 `80,443/tcp`（见第 6 步）。
- Caddy 日志进 journald（`journalctl -u caddy`），没有额外日志文件。
- 若 80/443 在云安全组没开，`journalctl` 会看到 ACME `connection refused`，先把安全组配置好再重试 `systemctl restart caddy`。

---

## 第 4 步：Node 24 + 应用（systemd 常驻）

> 目标：代码放到 `/opt/gendouyun`，用非 root 用户 `gendouyun` 运行 `node server.js`，只监听 `127.0.0.1:3000`，由 systemd 托管、崩了自动拉起。

### 前提

- 第 3 步的 `curl -I https://www.gendouyun.cn` 已经返回 502（说明反代通了）。
- 代码仓库是私有的（`git@github.com:737/gendouyun.git`），需要 GitHub **Deploy key**（只读）才能拉取。
- `dist/` 不入库，**必须在服务器上构建**（`npm run build` 需要 devDependencies，所以不能 `npm ci --omit=dev`）。

### ① 安装 Node 24（NodeSource）

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
node -v && npm -v          # 期望 v24.x.x / 11.x，node 必须 >= 22.23.4
```

### ② 建运行用户 + 配 Deploy key + 拉代码

```bash
# 运行用户：不能登录，只跑应用
adduser --system --group --no-create-home --home /opt/gendouyun --shell /usr/sbin/nologin gendouyun

# 生成专用部署密钥（只给这个仓库读权限）
ssh-keygen -t ed25519 -C "vps-gendouyun" -f /root/.ssh/gendouyun_deploy -N ""
cat /root/.ssh/gendouyun_deploy.pub
```

把上面输出的公钥粘到 GitHub → 仓库 Settings → **Deploy keys** → Add deploy key（不勾 write）。然后：

```bash
cat >>/root/.ssh/config <<'EOF'
Host github.com
  IdentityFile /root/.ssh/gendouyun_deploy
  IdentitiesOnly yes
EOF
chmod 600 /root/.ssh/config
ssh-keyscan github.com >> /root/.ssh/known_hosts 2>/dev/null
ssh -T git@github.com          # 期望 "successfully authenticated"（提示 shell access 是正常的）

git clone git@github.com:737/gendouyun.git /opt/gendouyun
chown -R gendouyun:gendouyun /opt/gendouyun
```

### ③ 装依赖并构建（必须用 gendouyun 身份，否则产物属 root）

```bash
cd /opt/gendouyun
runuser -u gendouyun -- npm ci
runuser -u gendouyun -- npm run build
ls -l dist/index.html      # 必须有这个文件，否则第 ④ 步启动即退出
```

### ④ systemd 单元

```bash
cat >/etc/systemd/system/gendouyun.service <<'EOF'
[Unit]
Description=gendouyun (Koa + Vue) web server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=gendouyun
Group=gendouyun
WorkingDirectory=/opt/gendouyun
Environment=NODE_ENV=production
Environment=HOST=127.0.0.1
Environment=PORT=3000
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
SyslogIdentifier=gendouyun

# 最小权限：应用不需要写系统任何位置
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/gendouyun

[Install]
WantedBy=multi-user.target
EOF
```

### ⑤ 启动并验证

```bash
systemctl daemon-reload
systemctl enable --now gendouyun
systemctl status gendouyun --no-pager
journalctl -u gendouyun -n 30 --no-pager
```

期望的验证结果：

```bash
curl -s http://127.0.0.1:3000/healthz        # {"status":"ok",...,"node":"v24.x.x"}
curl -I https://www.gendouyun.cn             # 200（不再是 502）
curl -s https://www.gendouyun.cn | head -5   # 返回 dist/index.html 的 HTML
ss -lntp | grep 3000                         # 只看到 127.0.0.1:3000，不是 0.0.0.0
```

### 浏览器实测（这一步的最终验收）

打开浏览器（建议无痕窗口，避免缓存干扰），访问：

- `https://www.gendouyun.cn`
- `https://gendouyun.cn`（裸域，应同样正常，地址栏显示锁形图标）

按 F12 打开开发者工具，看 **Network** 面板：

| 检查项 | 期望 |
| --- | --- |
| 文档请求 `www.gendouyun.cn` | `200`，协议 `h2`，有锁 |
| `assets/*.js`、`assets/*.css` | 全部 `200`（有 404 说明构建产物不全或没同步） |
| 刷新时静态资源 | `Cache-Control` 里含 `immutable`（`server/middleware/cache.js` 已配长缓存） |
| Console 面板 | 无大面积红色报错 |

再看 **Application** → Cookies / Storage：确认页面渲染出的内容（导航站点、图标）正常，不是白屏。

常见异常对照：

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 502 | Node 没起或崩了 | `systemctl status gendouyun`、`journalctl -u gendouyun -n 50` |
| 页面能开但白屏、JS 全 404 | `dist` 没构建成功或只同步了部分文件 | 回 ③ 重跑 `npm run build`，`ls dist/assets` 应有哈希文件 |
| 还是旧页面 | 浏览器缓存 | `Ctrl+F5` 强刷，或换无痕窗口 |
| 证书警告 / 连接被拒 | DNS 未生效或安全组没开 443 | 回第 1 步用 `nslookup` 复查解析 |

### 注意事项

- **不要**用 `npm start` 在终端里前台跑；`npm start` 只是本地调试用，线上交给 systemd。
- 若 `journalctl` 出现 `[ignite] 初始化失败` 且提到 `ENOENT ... dist/index.html`，说明构建没做或失败，回 ③ 重跑。
- `node -v` 低于 22.23.4 会被 `package.json` 的 engines 卡住，用第 ① 步的 NodeSource 源重装，别用 `apt install nodejs`（24.04 自带的是 18）。
- 更新发布流程（以后常用）：

  ```bash
  cd /opt/gendouyun
  runuser -u gendouyun -- git pull
  runuser -u gendouyun -- npm ci
  runuser -u gendouyun -- npm run build
  systemctl restart gendouyun
  curl -s http://127.0.0.1:3000/healthz
  ```

---

## 第 5 步：Hysteria2（443/udp，QUIC 代理）

> 目标：和 Caddy **共用 443 端口但不同协议** —— TCP 443 归网站，UDP 443 归代理，两者互不干扰；证书复用 Caddy 已经签好的那张，不在服务器上再跑一套 ACME。

### 先理解三个关键点

1. 官方脚本会创建系统用户 `hysteria`、二进制 `/usr/local/bin/hysteria`、配置 `/etc/hysteria/config.yaml`、systemd 单元 `hysteria-server.service`。
2. **绝对不要**在 hysteria 配置里写 `masquerade.listenHTTP` / `listenHTTPS`，那是 TCP 80/443，已经被 Caddy 占着，写了必然启动失败。
3. 证书不能直接指向 Caddy 的目录：`/var/lib/caddy/.local/share/caddy/` 属主是 `caddy`、权限 0700，`hysteria` 用户读不到。做法是**定时同步一份副本**，并在证书变化后重启 hysteria。

### ① 安装

```bash
bash <(curl -fsSL https://get.hy2.sh/)
hysteria version
ls -l /etc/hysteria/config.yaml        # 脚本生成的示例配置，稍后覆盖
```

### ② 生成两个密码（记下来，客户端要用）

```bash
openssl rand -base64 24      # 认证密码，下文记为 PASS
openssl rand -base64 24      # 混淆密码，下文记为 OBFS_PASS
```

### ③ 证书同步脚本

```bash
mkdir -p /etc/hysteria/certs
cat >/usr/local/bin/hysteria-cert-sync <<'EOF'
#!/usr/bin/env bash
# 把 Caddy 签发的证书同步给 hysteria，变化后重启 hysteria 让新证书生效
set -euo pipefail

DOMAIN=www.gendouyun.cn
SRC="/var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/${DOMAIN}"
DEST=/etc/hysteria/certs

[ -f "${SRC}/${DOMAIN}.crt" ] || { echo "证书不存在: ${SRC}" >&2; exit 1; }

mkdir -p "$DEST"
changed=0
for f in "${DOMAIN}.crt" "${DOMAIN}.key"; do
  if ! cmp -s "${SRC}/${f}" "${DEST}/${f}"; then
    install -m 640 -o root -g hysteria "${SRC}/${f}" "${DEST}/${f}"
    changed=1
  fi
done

if [ "$changed" -eq 1 ]; then
  echo "证书已更新，重启 hysteria-server"
  systemctl try-restart hysteria-server.service || true
fi
EOF
chmod 755 /usr/local/bin/hysteria-cert-sync

/usr/local/bin/hysteria-cert-sync      # 先手动跑一次
ls -l /etc/hysteria/certs              # 应看到 .crt/.key，属主 root:hysteria，权限 640
```

若提示证书不存在，先用 `ls /var/lib/caddy/.local/share/caddy/certificates/` 确认 Caddy 的目录结构（确认 HTTPS 能打开后再来）。

### ④ 定时同步（续期后自动生效）

```bash
cat >/etc/systemd/system/hysteria-cert-sync.service <<'EOF'
[Unit]
Description=Sync Caddy-issued certificate for Hysteria 2

[Service]
Type=oneshot
ExecStart=/usr/local/bin/hysteria-cert-sync
EOF

cat >/etc/systemd/system/hysteria-cert-sync.timer <<'EOF'
[Unit]
Description=Periodically sync Caddy certificate for Hysteria 2

[Timer]
OnBootSec=1min
OnUnitActiveSec=6h
Unit=hysteria-cert-sync.service

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload
systemctl enable --now hysteria-cert-sync.timer
systemctl list-timers hysteria-cert-sync.timer --no-pager
```

### ⑤ 写服务端配置

```bash
cat >/etc/hysteria/config.yaml <<'EOF'
# UDP 443：与 Caddy 的 TCP 443 共存，互不冲突
listen: :443

tls:
  cert: /etc/hysteria/certs/www.gendouyun.cn.crt
  key: /etc/hysteria/certs/www.gendouyun.cn.key

auth:
  type: password
  password: 换成PASS

# 混淆：让 QUIC 流量不再有明显的 Hysteria 特征，抗主动探测
obfs:
  type: salamander
  salamander:
    password: 换成OBFS_PASS

# 被探测时伪装成自家站点（不是 404 或空响应）
masquerade:
  type: proxy
  proxy:
    url: https://www.gendouyun.cn
    rewriteHost: true
EOF

chmod 600 /etc/hysteria/config.yaml
```

### ⑥ 启动并验证

```bash
systemctl enable --now hysteria-server
systemctl status hysteria-server --no-pager
journalctl -u hysteria-server -n 30 --no-pager
```

期望 `ss` 的结果（UDP 443 属于 hysteria，TCP 443 属于 caddy）：

```bash
ss -lunp | grep ':443'      # hysteria 监听 udp 443
ss -lntp | grep ':443'      # caddy 监听 tcp 443
```

### ⑦ 客户端配置（Windows / Clash Verge）

打开 **Clash Verge** → 左侧「配置」→ 右上「新建」→ 类型选 **Local / 本地** → 名称随便填，比如 `vps-usa` → 把下面整段粘进去 → 保存 → 点这个配置的「使用」。

```yaml
mixed-port: 7897
allow-lan: false
mode: rule
log-level: info
ipv6: false

dns:
  enable: true
  nameserver:
    - 223.5.5.5
    - 119.29.29.29

proxies:
  - name: "vps-usa"
    type: hysteria2
    server: www.gendouyun.cn
    port: 443
    password: "PASS"
    sni: www.gendouyun.cn
    skip-cert-verify: false
    udp: true
    obfs: salamander
    obfs-password: "OBFS_PASS"
    up: "50 Mbps"
    down: "200 Mbps"

proxy-groups:
  - name: "PROXY"
    type: select
    proxies:
      - "vps-usa"
      - DIRECT

rules:
  - GEOIP,CN,DIRECT
  - MATCH,PROXY
```

`PASS` / `OBFS_PASS` 换成第 ② 步生成的两个密码（认证密码和混淆密码**不是同一个**）。

然后：左侧「设置」→ 打开**系统代理**（或开 **TUN 模式**，更彻底，能代理不认系统代理的程序）→ 左侧「代理」→ 在 `PROXY` 组里选 `vps-usa`。

### ⑧ 验证

```bash
# 服务器上：先确认 udp 443 在监听
ss -lunp | grep ':443'
```

客户端（浏览器）验证：

- 打开 `https://ipinfo.io` —— IP 和城市应变成 VPS 所在地，不是本地运营商 IP。
- 打开 `https://www.youtube.com` —— 能打开即通。

**两个值必须和服务端一致，否则连不上：**

| 客户端字段 | 必须等于服务端 |
| --- | --- |
| `server` / `sni` | `www.gendouyun.cn`（服务端证书是这张） |
| `obfs` + `obfs-password` | 服务端 `obfs.type: salamander` + 对应密码 |

> 如果沿用旧配置（`server: gendouyun.cn`、不带 `obfs`），而服务端是本文这份配置，会握手失败。要么把服务端 `obfs` 整段删掉、证书同步改用裸域那张，要么把客户端改成上面的写法 —— **两边必须对称**。

### ⑨ iOS 手机端（ClashMi）用订阅链接导入

ClashMi 是 Mihomo 内核，和 Clash Verge 同一套 YAML 格式，不用重学。最省事的做法：把配置放到服务器的 `/srv/sub/`（第 3 步 Caddy 已经用 `handle_path /sub/*` 暴露了这个目录），手机用 URL 导入；以后改密码/加节点，手机上点「更新」即可。

**① 服务器上生成订阅文件**（文件名用 128 位随机，别用可猜的名字）

```bash
RAND=$(openssl rand -hex 16)     # 32 个十六进制字符，约 128 bit 熵
mkdir -p /srv/sub

cat >/srv/sub/hy2-${RAND}.yaml <<'EOF'
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: false

proxies:
  - name: "vps-usa"
    type: hysteria2
    server: www.gendouyun.cn
    port: 443
    password: "PASS"
    sni: www.gendouyun.cn
    skip-cert-verify: false
    udp: true
    obfs: salamander
    obfs-password: "OBFS_PASS"

proxy-groups:
  - name: "PROXY"
    type: select
    proxies:
      - "vps-usa"
      - DIRECT

rules:
  - DOMAIN-SUFFIX,gendouyun.cn,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,PROXY
EOF

chown caddy:caddy /srv/sub/hy2-${RAND}.yaml
chmod 644 /srv/sub/hy2-${RAND}.yaml
echo "订阅地址： https://www.gendouyun.cn/sub/hy2-${RAND}.yaml"
```

**② 确认能从公网拉到**

```bash
curl -s "https://www.gendouyun.cn/sub/hy2-<刚才的随机串>.yaml" | head -6
curl -I https://www.gendouyun.cn | head -1     # 顺带确认网站没被搞坏，仍是 200
```

**③ 手机导入**

1. 打开 **ClashMi** → 底部「配置 / Profiles」→ 右上 `+` → 选「从 URL 导入」
2. 粘贴第 ② 步的地址 → 起名（如 `vps-usa`）→ 确定，等它下载完
3. 选中这个配置 → 去「代理 / 策略」里选 `PROXY` → `vps-usa`
4. 回首页打开开关 → iOS 弹「ClashMi 想要添加 VPN 配置」→ 允许，验证 Face ID / 密码

**④ 验证**

手机浏览器打开 `https://ip.sb`（或 `ipinfo.io`），IP 显示为 VPS 所在地即成功；再开 `https://www.youtube.com` 能访问就收工。

**⑤ 以后改配置**

改完 `/srv/sub/hy2-XXXX.yaml` 后，手机上点该配置的「更新」（或下拉刷新），不用删掉重建。只有**改了文件名**才需要重新导入 URL。

> 第一条规则 `DOMAIN-SUFFIX,gendouyun.cn,DIRECT` 是关键，三个作用：
> 1. 拉订阅时不会出现「要代理才能拉订阅、要订阅才有代理」的死循环；
> 2. 手机访问自己网站不绕一圈日本；
> 3. 节点挂了时还能直连网站，判断是「节点问题」还是「机器挂了」。
>
> 桌面端 Clash Verge 是本地配置、没有拉订阅的动作，不需要这条规则。

**⑥ 撤销订阅（不想再让别人拉到）**

两种做法，按“想不想留着文件”来选：

```bash
# a) 只关访问、文件保留（caddy 用户读不到 → 403，内容还在，可以随时恢复）
chmod 600 /srv/sub/hy2-XXXX.yaml

# b) 彻底删除（返回 404，不可恢复）
rm -f /srv/sub/hy2-XXXX.yaml

# 恢复 a) 的访问
chmod 644 /srv/sub/hy2-XXXX.yaml && chown caddy:caddy /srv/sub/hy2-XXXX.yaml
```

验证访问确实没了：

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.gendouyun.cn/sub/hy2-XXXX.yaml
# 403（用 a）或 404（用 b）
```

⚠️ 撤销只停掉“拉订阅”这个动作，**已经在手机里导入的配置照样能连代理** —— 因为它已经拿到密码了。想真正断掉某台设备，必须换 `auth.password`（下一节）。

**⑦ 换密码 / 换混淆密码的顺序（别把顺序搞反）**

原密码泄露、或想踢掉所有设备时走这套。**核心原则：两个文件都改完，最后才重启一次**；中途重启会出现“客户端拿到新密码、服务端还在用旧密码”的窗口。

```bash
# ① 生成新密码（两个都换就都生成）
NEW_PASS=$(openssl rand -base64 24); echo "PASS=$NEW_PASS"
NEW_OBFS=$(openssl rand -base64 24); echo "OBFS_PASS=$NEW_OBFS"

# ② 改服务端配置（此时不重启：旧密码还在内存里生效，现有连接不断）
vim /etc/hysteria/config.yaml
#   auth.password            = NEW_PASS
#   obfs.salamander.password = NEW_OBFS

# ③ 改订阅文件（客户端下次拉取就能拿到新值）
vim /srv/sub/hy2-XXXX.yaml
#   password      = NEW_PASS
#   obfs-password = NEW_OBFS

# ④ 只重启这一次，新密码生效
systemctl restart hysteria-server
systemctl status hysteria-server --no-pager
```

⑤ 客户端：手机/桌面点「更新」重新拉订阅，或手动把新密码填进去。

⑥ 验证：

```bash
# 服务器侧：进程正常、仍在监听
ss -lunp | grep ':443'
journalctl -u hysteria-server -n 20 --no-pager

# 订阅侧：拿到的是新密码
curl -s https://www.gendouyun.cn/sub/hy2-XXXX.yaml | grep -E 'password'
```

判定标准：客户端重连后 `ip.sb` 显示 VPS IP。如果全部客户端都连不上，先看第 ② 步有没有把 `obfs.salamander.password` 也改了 —— 混淆密码不匹配的表现和认证密码错误一样（握手失败），日志里只有一句含糊的 `authentication failed` 或直接超时。

> 只改混淆密码（`obfs`）、不改认证密码，同样要重启 hysteria，同样会断开所有客户端。

### 注意事项

- 云厂商安全组要额外放行 **UDP 443**（TCP 443 在第 3 步已开）；只开 TCP 时客户端会一直超时。
- 证书是 `www` 那张，客户端 `sni` 必须写 `www.gendouyun.cn`，写裸域会证书不匹配。
- `journalctl` 报 `failed to load certificate` → 第 ③ 步没跑或权限不对（应为 `root:hysteria 640`）。
- 协议识别是 QUIC，**不要**给 443/udp 配 BBR 之外的东西；第 6 步开 ufw 时用 `ufw allow 443/udp`。
- **订阅文件是公开的**：`/srv/sub/` 下所有文件都能被互联网直接访问，谁拿到链接谁就能用你的节点、烧你的流量。所以文件名用随机串、别发群别截图；这个目录里也别放任何别的敏感文件（第 3 步验证用的 `_health.yaml` 记得删掉）。
- 随机串长度决定抗爆破能力：`openssl rand -hex 4` 只有 32 bit（约 43 亿种，按 1000 次/秒扫也要 50 天），`-hex 16` 是 128 bit，实际无法枚举 —— 所以本文用 `-hex 16`。Caddy 默认不开目录列表（`file_server` 没写 `browse`），`/sub/` 本身返回 404，别人拿不到文件名列表，只能猜。
- 真正会泄露订阅地址的通常不是爆破，而是：截图、聊天记录、浏览器历史、代理/日志服务、把链接贴进 issue。**链接本身就是凭证**，泄露后等于泄露节点。
- 订阅文件里的密码**不要**写进 git 仓库（和 README 分开放），密码只存在服务器上。
- 别把 Caddyfile 改成 `@sub path /sub/*` + `handle` + `root * /srv/sub` 那种写法：`handle` 不会剥掉 `/sub` 前缀，会去找 `/srv/sub/sub/x.yaml`，直接 404。用第 3 步的 `handle_path`（会剥前缀）才是「文件放 `/srv/sub/x.yaml`、URL 是 `/sub/x.yaml`」。
- 手机上 `mixed-port: 7890` 基本不起作用（iOS 由 App 自己管理端口），填什么都不影响。

---

## 第 6 步：ufw / fail2ban / BBR 收尾

> 目标：把唯一的入口（22/80/443）收口到 ufw 这一层，挡掉 SSH 爆破，并打开 BBR 让跨境链路更稳。
> **顺序很重要**：先放行 SSH，再启用 ufw。反过来会把自己锁在防火墙外面。

### ① BBR + UDP 缓冲（先做，不影响连通性）

```bash
cat >/etc/sysctl.d/99-bbr.conf <<'EOF'
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# Hysteria2 走 QUIC/UDP，默认的 208KB 接收缓冲会压带宽
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
EOF

sysctl --system
sysctl net.ipv4.tcp_congestion_control     # 期望 bbr
sysctl net.core.rmem_max                   # 期望 16777216
```

### ② ufw（先放行，后启用）

```bash
ufw default deny incoming
ufw default allow outgoing

ufw allow 22/tcp    comment 'ssh'
ufw allow 80/tcp    comment 'http (acme)'
ufw allow 443/tcp   comment 'https (caddy)'
ufw allow 443/udp   comment 'hysteria2 (quic)'

ufw --force enable
ufw status verbose
```

确认这三条规则都在，最后一行是 `Status: active` 再往下走：

```bash
ufw status | grep -E '22|80|443'
```

> ⚠️ 如果你改过 SSH 端口，把 `22/tcp` 换成实际端口。启用后**先开一个新终端**重新 SSH 登录验证一次，别急着关掉当前会话 —— 万一被锁，还能用服务商控制台的 VNC 救回来。

### ③ fail2ban（挡 SSH 爆破）

```bash
cat >/etc/fail2ban/jail.local <<'EOF'
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5
backend  = systemd

[sshd]
enabled = true
EOF

systemctl enable --now fail2ban
systemctl status fail2ban --no-pager
fail2ban-client status sshd        # 能看到 "Currently banned" 即正常工作
```

### ④ 全部服务设为开机自启 + 重启验收

```bash
systemctl enable caddy gendouyun hysteria-server fail2ban
reboot
```

重启后重新 SSH 上来，跑一遍总验收：

```bash
# 服务状态：4 个都应 active (running)
systemctl is-active caddy gendouyun hysteria-server fail2ban

# 网站
curl -sI https://www.gendouyun.cn | head -1          # HTTP/2 200
curl -s http://127.0.0.1:3000/healthz                # {"status":"ok",...}

# 端口：tcp 80/443 属 caddy，udp 443 属 hysteria，3000 只在回环
ss -lntp | grep -E ':80|:443|:3000'
ss -lunp | grep ':443'

# 防火墙与内核
ufw status | head -8
sysctl net.ipv4.tcp_congestion_control               # bbr

# fail2ban
fail2ban-client status sshd
```

### 注意事项

- `ufw status verbose` 里如果出现 `443/udp ALLOW` 但客户端仍连不上，问题在**云厂商安全组**（ufw 之上还有一层），两边都要放行。
- ufw 默认会拦掉 ICMP，`ping` 不通是正常的，不代表服务挂了。
- 想省事可以装 `unattended-upgrades` 自动打安全补丁：

  ```bash
  apt install -y unattended-upgrades
  systemctl enable --now unattended-upgrades
  ```

- 到这里部署就结束了。日常维护只涉及两处：代码更新（第 4 步末尾的 4 行流程）、Caddy 证书自动续期（无需干预，hysteria 的证书由 timer 跟着同步）。




