# soa-hotel-service
APPID:100023494
## 项目结构
```
.
├── app.config.js  // 项目配置信息
├── build // 构建工具
│   ├── koa
│   ├── setup-dev-server.js
│   ├── webpack.base.config.js
│   ├── webpack.client.config.js
│   └── webpack.server.config.js
├── client // 客户端项目
│   ├── App.vue
│   ├── app.js // 客户端入口
│   ├── components // 组件集
│   ├── entry-client.js
│   ├── entry-server.js
│   ├── index.template.html // 根模板
│   ├── router
│   ├── store
│   ├── utils // 工具集
│   └── views // 业务视图
├── package.json // 项目依赖
├── scripts
│   ├── dump.cmd
│   ├── dump.sh
│   ├── shutdown.sh
│   └── startup.sh
├── server 服务端项目
│   ├── app.js // 服务端入口
│   ├── controllers // api层
│   ├── ignite // 项目点火工具
│   ├── middleware // Koa中间件
│   ├── model // model层，定义response(或request)body数据结构
│   ├── router.config.js // 路由配置表
│   ├── router.js
│   └── utils // 工具集
└── server.js // 应用入口

15 directories, 22 files
```
## NodeJS版本
框架目前支持的NodeJS版本有两个：`6.10.2`与`8.9.4`，本项目中使用的NodeJS版本为`8.9.4`。为保证项目上线运行与本地开发一致性，请使用`8.9.4`版本进行本地开发。

如果本地需要使用不同版本的NodeJS进行开发，推荐使用NVM(Node Version Manager)进行NodeJS版本管理，详情请参考[这里](https://github.com/creationix/nvm)
## 本地调试
推荐使用nodemon，可以支持热更新
### DEV
```
npm run dev
```
### PROD
```
npm run build
npm start
```
### 使用VSCode Debug
在VSCode Debug功能下的`launch.json`配置如下:
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
        "type": "node",
        "request": "launch",
        "name": "nodemon",
        "runtimeExecutable": "${env:HOME}/.nvm/versions/node/v8.9.4/bin/nodemon", // 如果使用了nvm，可以这样配置。如果没有，直接配置"nodemon"即可
        "skipFiles": [
            "${workspaceFolder}/node_modules/**/*.js",
        ],
        "program": "${workspaceFolder}/server.js",
        "protocol": "inspector",
        "restart": true,
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen"
    }, ]
}
```

## 参考
[机票node服务](http://git.dev.sh.ctripcorp.com/flight/soa-web-service)

[酒店Koa SSR项目](http://git.dev.sh.ctripcorp.com/cydgroup/koahotelssr)

## TODO List(SSR)
### 服务端
1. <del>项目整体转为Koa</del>
2. 完善中间件
    - <del>点火</del>
    - <del>性能分析</del>
    - <del>路由</del>
    - <del>404/500异常处理</del>(其实500还没处理...)
    - 待补充...
3. <del>vue页面渲染路由</del>
4. 调整、完善server下目录结构
5. 完善test功能
6. 剥离原做服务的部分，服务与ssr分离
7. cookie穿透，将客户端发来的cookie穿透到页面服务端渲染时预获取的数据请求中

### 客户端
1. <del>vue SSR基础设施</del>
2. <del>路由层</del>
3. 工具类
4. 服务端渲染时asyncData部分记录报错日志

### 打包工具
1. <del>基础打包配置</del>
2. <del>dev环境webpack serve</del>
3. <del>scss打包配置</del>
4. <del>font-icon打包配置</del>
5. 接入Ares
6. 生产环境打包
7. 优化
8. 待补充...
