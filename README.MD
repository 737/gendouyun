# 跟斗云（gendouyun）

个人导航站：Koa 服务端托管 `dist` 静态产物，前端为 Vue 3 + TypeScript + Vite。

## 环境要求

- Node.js **22.23.4**（仓库内 `.nvmrc` 已固定该版本，`nvm` / `fnm` / `volta` 均能识别）
- npm **10.9.9**（随 Node 22.23.4 一并安装）

```bash
# nvm-windows / nvm
nvm install 22.23.4
nvm use 22.23.4

node -v   # v22.23.4
npm -v    # 10.9.9
```

## 安装

根目录与 `client/` 组成 npm workspaces，**只需在根目录安装一次**，前端依赖会被一并装好：

```bash
npm install
```

## 常用命令（均在根目录执行）

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器（默认 http://localhost:5173） |
| `npm run build` | 类型检查 `vue-tsc` + 构建前端产物到 `dist/` |
| `npm start` | 生产模式启动 Koa 服务（默认 http://localhost:3000） |

启动后由 `server/app.js` 读取 `package.json` 中的 `config`（`port`、`vd`）并托管 `dist/`，
`server/ignite` 在启动时预热模板，所有未命中的路由统一返回 `dist/index.html`（history 路由）。

## 目录结构

```
.
├── server.js              # 服务入口
├── server/                # Koa 服务端
│   ├── app.js             # 应用装配（静态资源、bodyParser、helmet、路由）
│   ├── router.js          # 路由，未命中时回退 index.html
│   ├── ignite/            # 启动时加载器（模板、页面配置）
│   ├── middleware/        # 全局中间件
│   └── utils/             # 工具
├── client/                # Vue 3 前端（Vite）
│   ├── src/
│   ├── vite.config.ts     # 构建输出到 ../dist
│   └── tsconfig.json
├── dist/                  # 前端构建产物（由 koa-static-cache 托管）
└── package.json           # workspaces + 服务端依赖
```

## 运行时版本

| 组件 | 版本 |
| --- | --- |
| Node.js | 22.23.4 |
| Koa | 3.x |
| @koa/router | 15.x |
| Vue | 3.5.x |
| Vue Router | 4.x |
| Vite | 7.x |
| TypeScript | 5.9.x |
| vue-tsc | 3.x |

## 升级说明（Node 10 → Node 22.23.4）

- 版本基线：`.nvmrc` = `22.23.4`，`package.json` 的 `engines` 要求 `node >= 22.23.4`、`npm >= 10.9.9`。
- 服务端：`koa` 2 → 3，`koa-router`（已废弃）→ `@koa/router` 15，`koa-helmet` 5 → 9（`helmet` 8 改为显式依赖），
  `koa-bodyparser` 3 → 4，`lru-cache` 4 → 11（改为具名导出 `LRUCache`）。
- 前端：`vite` 2 → 7，`@vitejs/plugin-vue` 1 → 6，`vue` 3.2 → 3.5，`vue-router` 4.0 → 4.6，
  `typescript` 4.4 → 5.9，`vue-tsc` 0.3 → 3，`tsconfig` 改用 `moduleResolution: bundler`。
- 工程化：改用 npm workspaces（一次安装），`vite.config.ts` 使用 ESM 写法并开启 `emptyOutDir`，
  SCSS 全局变量由 `@import` 迁移为 `@use`（避免 Dart Sass 弃用告警）。
- 清理：移除未使用的 `bluebird`、`element-ui`、`js-md5`、`log4js`、`request`、`vuex` 及根目录多余的 `vite` 依赖。
