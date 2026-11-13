const path = require('path');
const koa = require('koa');
const helmet = require('koa-helmet');
const staticServer = require('koa-static-cache');
const { LRUCache } = require('lru-cache');
const bodyParser = require('koa-bodyparser');
const Ignite = require('./ignite');

const resolve = file => path.resolve(__dirname, file);
const router = require('./router');
const config = require(path.resolve('./package.json')).config;
const globalState = require('./middleware/global');
const cacheControl = require('./middleware/cache');

const vd = config.vd && config.vd !== '/' ? config.vd : '/';

// 端口 / 监听地址优先级：环境变量 > package.json 的 config > 默认值。
// 生产环境只监听回环地址，公网流量一律经 Caddy 反代进来：
// 这样即便 ufw 规则写漏了，3000 端口也不会直接暴露在公网上。
const port = process.env.PORT || config.port || 8080;
const host = process.env.HOST || '127.0.0.1';

// 避免OOM：只缓存静态文件的元数据、内容和 gzip 结果（dist 总共百来 KB）
var files = new LRUCache({ max: 1000 });

const newStaticPath = resolve('../dist');
const newStaticOutputPath = vd;
const _SERVICE_IGNITE_STATUS_ = {};
const _SERVICE_NODEJS_CONFIG_ = {};

// 统一兜底：不要把异常堆栈吐给客户端，生产环境只记日志
const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status && err.status >= 400 ? err.status : 500;
        ctx.type = 'text/plain; charset=utf-8';
        ctx.body = ctx.status === 500 ? 'Internal Server Error' : err.message;
        console.error('[request-error]', ctx.method, ctx.url, err.stack || err);
    }
};

Ignite.exec(_SERVICE_IGNITE_STATUS_, _SERVICE_NODEJS_CONFIG_).then(() => {
    // 模板没加载成功时页面必然 500，与其带病服务不如让 systemd 重启并留下日志
    if (_SERVICE_IGNITE_STATUS_.result !== 'success') {
        console.error('[ignite] 初始化失败，拒绝启动', JSON.stringify(_SERVICE_IGNITE_STATUS_));
        process.exit(1);
    }

    const state = {};
    const app = new koa();

    Object.assign(state, {
        _SERVICE_IGNITE_STATUS_,
        _SERVICE_NODEJS_CONFIG_,
    });

    Object.assign(_SERVICE_NODEJS_CONFIG_, config);

    // 反代后取真实客户端 IP（Caddy 会带 X-Forwarded-For）
    app.proxy = true;

    app.use(errorHandler);
    // 配置Koa下的一些安全策略，参考：https://github.com/venables/koa-helmet#readme
    app.use(helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            // 本地用 http 跑 npm start 时不要被强制升级到 https，线上保持默认开启
            directives: process.env.NODE_ENV === 'production' ? {} : { upgradeInsecureRequests: null },
        },
    }));
    // 必须排在静态中间件之前：koa-static-cache 命中文件后不再 next()，
    // 挂在它后面的中间件拿不到静态资源响应
    app.use(cacheControl());
    app.use(staticServer({
        dir: newStaticPath,
        prefix: newStaticOutputPath,
        dynamic: true,
        files: files,
        // 预压缩后缓存在内存里，同一文件的 gzip 结果只算一次
        buffer: true,
        gzip: true
    }))
    // 将请求体转换为 JSON 的中间件
    app.use(bodyParser());
    app.use(globalState(state));

    router(app, vd);

    const server = app.listen(port, host, () => {
        const message = `load config with: ${JSON.stringify(config)}, mount route at ${vd}, start at ${host}:${port}, release ${process.env.RELEASE || 'dev'}`;

        console.log('application message', message);
    });

    server.on('error', (err) => {
        console.error('[listen-error]', host, port, err.message);
        process.exit(1);
    });

    // systemd stop/restart 时先停止接收新连接，再退出，避免请求被硬切断
    const shutdown = (signal) => {
        console.log(`[shutdown] received ${signal}`);
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 15000).unref();
    };

    ['SIGTERM', 'SIGINT'].forEach(signal => process.on(signal, () => shutdown(signal)));

}).catch((err) => {
    console.error('[ignite] 初始化异常', err);
    process.exit(1);
});
