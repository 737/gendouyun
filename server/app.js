const fs = require('fs');
const Koa = require('koa');
const helmet = require('koa-helmet');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const LRU = require('lru-cache');
const staticServer = require('koa-static-plus');
const { createBundleRenderer } = require('vue-server-renderer');

const clog = require('./utils/log');
const Ignitor = require('./ignite');
const middleware = require('./middleware');
const globalState = require('./middleware/global');
const router = require('./router');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

// 引入对Date.prototype的扩展，以方便在代码中操作日期
require('./utils/Date.js');

const _SERVICE_IGNITE_STATUS_ = {};
const _SERVICE_NODEJS_SITE_ = {}; // 暂时没用

function createRenderer(bundle, options = {}) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
            basedir: resolve('../dist'),
            // recommended for performance
            runInNewContext: false,
        }),
    );
}

Ignitor.exec(_SERVICE_IGNITE_STATUS_, _SERVICE_NODEJS_SITE_).then(() => {
    const state = Object.create(null);
    Object.assign(state, {
        _SERVICE_IGNITE_STATUS_,
        _SERVICE_NODEJS_SITE_,
    });

    const config = {};

    try {
        Object.assign(config, require(path.resolve('./package.json')).config);
    } catch (e) {
        console.log('[offical_h5_web] Load package.json Fail!');
    }

    Object.assign(state, {
        _SERVICE_NODEJS_CONFIG_: config,
    });

    const instanceId = process.env.NODE_APP_INSTANCE || 'default';
    const vd = config.vd && config.vd !== '/' ? config.vd + '/' : '/';
    const port = config.port || process.env.PORT || 8080;

    const app = new Koa();

    // 挂载开发or生产环境下的渲染模式与模板
    if (isProd) {
        const template = fs.readFileSync(_SERVICE_NODEJS_SITE_.templatePath, 'utf-8');
        const bundle = require('../dist/vue-ssr-server-bundle.json');
        const clientManifest = require('../dist/vue-ssr-client-manifest.json');

        try {
            _SERVICE_NODEJS_SITE_.renderer = createRenderer(bundle, {
                template,
                clientManifest,
            });
        } catch (err) {
            clog.error(err.toString(), err.stack);
        }
    } else {
        require('../build/setup-dev-server')(app, {
            templatePath: _SERVICE_NODEJS_SITE_.templatePath,
            updated: (bundle, options) => {
                _SERVICE_NODEJS_SITE_.renderer = createRenderer(bundle, options);
            },
        });
    }

    const staticPath = resolve('../dist'); // 静态资源路径
    const staticOutputPath = vd + 'dist'; // 静态资源输出路径

    // 加载静态资源
    app.use(staticServer(staticPath, { pathPrefix: staticOutputPath }));

    // 绑定全局变量
    app.use(globalState(state));
    // 请求时间记录
    app.use(middleware.create('performance'));
    // 将请求体转换为 JSON 的中间件
    app.use(bodyParser());
    // 配置Koa下的一些安全策略，参考：https://github.com/venables/koa-helmet#readme
    app.use(helmet());
    app.use(middleware.create('uuid'));
    // 在上下文在挂载常用属性、方法
    app.use(middleware.create('setup'));

    router(app, vd);

    app.listen(port, () => {
        const message = `load config with: ${JSON.stringify(
            config,
        )}, mount route at ${vd}, start at port ${port}`;
        !isProd && console.log('application message', message);
        clog.info({ type: 'koa', code: 0, id: instanceId }, message);
    });
});
