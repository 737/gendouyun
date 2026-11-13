# 一页速查（Ubuntu 24.04 / gendouyun.cn）

> 只有命令，没有解释。原理、坑、排查见 [README.md](README.md)。
> 占位符：`vpsIp地址`、`PASS`（认证密码）、`OBFS_PASS`（混淆密码）、`XXXX`（订阅随机串）。

---

## ① DNS（ename，先做，生效要等）

```bash
# 控制台：@ 和 www 各加一条 A 记录 → vpsIp地址（TTL 300）
nslookup gendouyun.cn 223.5.5.5
nslookup www.gendouyun.cn 8.8.8.8
```

## ② 系统底座

```bash
ssh root@vpsIp地址
apt update && apt full-upgrade -y
apt install -y curl wget git unzip vim ufw fail2ban chrony dnsutils
timedatectl set-timezone Asia/Shanghai
apt autoremove -y
```

## ③ Caddy

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy

install -d -o caddy -g caddy -m 755 /srv/sub

cat >/etc/caddy/Caddyfile <<'EOF'
gendouyun.cn, www.gendouyun.cn {
	encode zstd gzip

	handle_path /sub/* {
		root * /srv/sub
		file_server
	}

	reverse_proxy 127.0.0.1:3000
}
EOF

caddy validate --config /etc/caddy/Caddyfile
systemctl enable --now caddy
curl -I https://www.gendouyun.cn      # 502 = 链路已通（Node 还没起）
```

## ④ Node 24 + 应用

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
node -v                               # 必须 >= 24.22.3

adduser --system --group --no-create-home --home /opt/gendouyun --shell /usr/sbin/nologin gendouyun

ssh-keygen -t ed25519 -C "vps-gendouyun" -f /root/.ssh/gendouyun_deploy -N ""
cat /root/.ssh/gendouyun_deploy.pub   # → GitHub 仓库 Settings/Deploy keys（只读）
cat >>/root/.ssh/config <<'EOF'
Host github.com
  IdentityFile /root/.ssh/gendouyun_deploy
  IdentitiesOnly yes
EOF
chmod 600 /root/.ssh/config
ssh-keyscan github.com >> /root/.ssh/known_hosts 2>/dev/null
ssh -T git@github.com                 # "successfully authenticated" 即可

git clone git@github.com:737/gendouyun.git /opt/gendouyun
chown -R gendouyun:gendouyun /opt/gendouyun
cd /opt/gendouyun
runuser -u gendouyun -- npm ci
runuser -u gendouyun -- npm run build
ls -l dist/index.html                 # 必须有，否则启动即退出

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
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/gendouyun

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now gendouyun
curl -s http://127.0.0.1:3000/healthz
curl -I https://www.gendouyun.cn      # 200
```

## ⑤ Hysteria2（443/udp）

```bash
bash <(curl -fsSL https://get.hy2.sh/)
openssl rand -base64 24               # PASS
openssl rand -base64 24               # OBFS_PASS

cat >/usr/local/bin/hysteria-cert-sync <<'EOF'
#!/usr/bin/env bash
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
/usr/local/bin/hysteria-cert-sync

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

cat >/etc/hysteria/config.yaml <<'EOF'
listen: :443
tls:
  cert: /etc/hysteria/certs/www.gendouyun.cn.crt
  key: /etc/hysteria/certs/www.gendouyun.cn.key
auth:
  type: password
  password: 换成PASS
obfs:
  type: salamander
  salamander:
    password: 换成OBFS_PASS
masquerade:
  type: proxy
  proxy:
    url: https://www.gendouyun.cn
    rewriteHost: true
EOF
chmod 600 /etc/hysteria/config.yaml

systemctl enable --now hysteria-server
ss -lunp | grep ':443'                # hysteria 占 udp 443
ss -lntp | grep ':443'                # caddy 占 tcp 443
```

客户端 URI：

```
hysteria2://PASS@www.gendouyun.cn:443/?sni=www.gendouyun.cn&obfs=salamander&obfs-password=OBFS_PASS#vps-usa
```

## ⑥ 收尾（BBR / ufw / fail2ban）

```bash
cat >/etc/sysctl.d/99-bbr.conf <<'EOF'
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
EOF
sysctl --system

ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp  comment 'ssh'
ufw allow 80/tcp  comment 'http (acme)'
ufw allow 443/tcp comment 'https (caddy)'
ufw allow 443/udp comment 'hysteria2 (quic)'
ufw --force enable

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

systemctl enable caddy gendouyun hysteria-server fail2ban
reboot
```

重启后：

```bash
systemctl is-active caddy gendouyun hysteria-server fail2ban
curl -sI https://www.gendouyun.cn | head -1     # HTTP/2 200
ss -lntp | grep -E ':80|:443|:3000'
ss -lunp | grep ':443'
sysctl net.ipv4.tcp_congestion_control          # bbr
fail2ban-client status sshd
```

## ⑦ 手机订阅（可选）

```bash
RAND=$(openssl rand -hex 16)

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

curl -s "https://www.gendouyun.cn/sub/hy2-XXXX.yaml" | head -5
```

ClashMi / Clash Verge 里「从 URL 导入」这个地址即可。

撤销订阅：

```bash
chmod 600 /srv/sub/hy2-XXXX.yaml     # 只关访问 → 403（文件保留，可恢复）
# chmod 644 /srv/sub/hy2-XXXX.yaml   # 恢复
rm -f /srv/sub/hy2-XXXX.yaml         # 彻底删除 → 404

curl -s -o /dev/null -w '%{http_code}\n' https://www.gendouyun.cn/sub/hy2-XXXX.yaml
```

> 撤销不影响已导入的客户端（它们已经拿到密码）；要断掉得换 `auth.password` 并重启 hysteria。

## 日常维护

```bash
# 代码更新
cd /opt/gendouyun
runuser -u gendouyun -- git pull
runuser -u gendouyun -- npm ci
runuser -u gendouyun -- npm run build
systemctl restart gendouyun
curl -s http://127.0.0.1:3000/healthz

# 换订阅密码/节点：改 /srv/sub/hy2-XXXX.yaml → 手机/桌面点「更新」
# 证书：Caddy 自动续，hysteria 副本由 timer 每 6h 同步
```

换密码（两个文件都改完，最后只重启一次）：

```bash
NEW_PASS=$(openssl rand -base64 24); echo "PASS=$NEW_PASS"
vim /etc/hysteria/config.yaml        # auth.password
vim /srv/sub/hy2-XXXX.yaml           # password
systemctl restart hysteria-server
ss -lunp | grep ':443'
```

客户端点「更新」重连。
