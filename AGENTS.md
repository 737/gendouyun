# gendouyun（跟斗云导航）

Koa 3 + Vue 3 的导航站。单台 VPS（Ubuntu 24.04）同时提供网站和 Hysteria2 代理。

## 先读什么

- **部署手册**：`deploy/README.md` —— 架构图、组件清单、六步部署流程、排错
- **只要命令**：`deploy/CHEATSHEET.md`

涉及部署、服务器、域名的任何改动，先读 `deploy/README.md` 再动手。

## 硬约束（改之前对齐，别猜）

- 域名：`gendouyun.cn` + `www.gendouyun.cn`，Caddy 一张证书覆盖两者
- Caddy 用 `handle_path /sub/*`（会剥前缀）：文件放 `/srv/sub/x.yaml`，URL 是 `/sub/x.yaml`
- Node 只监听 `127.0.0.1:3000`（`server/app.js` 里 `HOST` 默认回环），公网流量一律经 Caddy
- Hysteria2 监听 `:443` **UDP**，TLS 证书复用 Caddy 签发的，由 `/usr/local/bin/hysteria-cert-sync` + systemd timer 每 6h 同步副本
- 应用目录 `/opt/gendouyun`，运行用户 `gendouyun`，systemd 单元 `gendouyun.service`
- `dist/` 不入库：服务器上 `npm ci`（**不能** `--omit=dev`，构建需要 vite / vue-tsc）+ `npm run build`
- 端口归属：80/443 TCP = Caddy，443 UDP = Hysteria2，3000 = Node 回环

## 文档写作约定

- 中文，命令给完整可粘贴代码块，"为什么"单独解释
- 凭据一律占位符：`PASS` / `OBFS_PASS`，IP 用 `vpsIp地址`，真实密码不进仓库
- 调整部署步骤时，`deploy/README.md` 与 `deploy/CHEATSHEET.md` 同步更新

## 不需要的东西

项目不需要 Docker / nginx / Redis / MySQL：单机单进程、无数据库、静态产物已在进程内用 LRU 缓存。除非出现多实例或跨进程共享的真实需求，否则不要主动引入。
