const path = require('path');
const koa = require('koa');
const helmet = require('koa-helmet');
const staticServer = require('koa-static-cache');
const LRU = require('lru-cache');
const bodyParser = require('koa-bodyparser');
const Ignite = require('./ignite');

const resolve = file => path.resolve(__dirname, file);
const router = require('./router');
const config = require(path.resolve('./package.json')).config;
const middleware = require('./middleware');
const globalState = require('./middleware/global');
const instanceId = process.env.NODE_APP_INSTANCE || 'default';
const vd = config.vd && config.vd !== '/' ? config.vd : '/';
const port = config.port || process.env.PORT || 8080;
// 避免OOM
var files = new LRU({ max: 1000 });


// app.use(async (ctx, next) => {
//     const start = Date.now();

//     await next();

//     const ms = Date.now() - start;
//     console.log(`${ctx.method}, ${ctx.url}, -- ${ms}`);

// });

const newStaticPath = resolve('../dist');
const newStaticOutputPath = vd;
const _SERVICE_IGNITE_STATUS_ = {};
const _SERVICE_NODEJS_CONFIG_ = {};

Ignite.exec(_SERVICE_IGNITE_STATUS_, _SERVICE_NODEJS_CONFIG_).then(() => {
    const state = {};
    const app = new koa();

    Object.assign(state, {
        _SERVICE_IGNITE_STATUS_,
        _SERVICE_NODEJS_CONFIG_,
    });

    Object.assign(_SERVICE_NODEJS_CONFIG_, config);

    app.use(staticServer({
        dir: newStaticPath,
        prefix: newStaticOutputPath,
        dynamic: true,
        files: files,
        gzip: true
    }))
    // 将请求体转换为 JSON 的中间件
    app.use(bodyParser());
    // 配置Koa下的一些安全策略，参考：https://github.com/venables/koa-helmet#readme
    app.use(helmet());
    app.use(globalState(state));

    router(app, vd);

    app.listen(port, () => {
        const message = `load config with: ${JSON.stringify(config)}, mount route at ${vd}, start at port ${port}`;

        console.log('application message', message);
    });

});


