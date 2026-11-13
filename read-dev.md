## 本地开发

Node 版本：**24.22.3**（见 `.nvmrc`）

```bash
nvm use 24.22.3

# 根目录安装一次即可（npm workspaces 会一并安装 client 依赖）
npm install

# 前端开发服务器
npm run dev

# 构建到 dist/
npm run build

# 生产模式跑 Koa（默认 3000 端口，可用 package.json 的 config.port 调整）
npm start
```

- 前端：http://localhost:5173/
- 服务端：http://localhost:3000/

安装慢时可临时换源：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 参考资料

[Vue 3.x Demo ( TypeScript + Router + Vuex)](https://github.com/wisewrong/test-vue3-demo)

### 服务器

1. https://www.ucloud.cn/site/active/new/kuaijie.html

### 部署

- nginx + ssl + pm2 部署 nodejs 服务
  - https://www.jianshu.com/p/8d1f4759d65c
  - https://github.com/zhaofinger/finger-blog
