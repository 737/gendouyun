# 部署手册（VPS / Ubuntu 24.04）

服务器整体架构

```
                        ┌─────────── VPS / Ubuntu 24.04 ───────────┐
 浏览器 ──443/tcp──▶ Caddy ──reverse_proxy──▶ Node 24 (:3000)
                        │   └─ handle_path /sub/* ─▶ /srv/sub/*.yaml
                        │
 代理客户端 ──443/udp──▶ Hysteria2 (QUIC) ──▶ 互联网
                        │
                        └─ ufw / fail2ban / BBR / systemd ─────────┘
```

---

## 部署步骤

- [x] 第 1 步：系统底座
- [ ] 第 2 步：Caddy
- [ ] 第 3 步：Node 24 + 应用
- [ ] 第 4 步：Hysteria2
- [ ] 第 5 步：ufw / fail2ban / BBR 收尾

---

## 第 1 步：系统底座（Ubuntu 24.04）

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


