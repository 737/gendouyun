
const path = require('path');
const koa = require('koa');
const koaStaticPlus = require('koa-static-plus');
const Ignitor = require('./ignite');
const router = require('./router');

const resolve = file => path.resolve(__dirname, file);

const _SERVICE_IGNITE_STATUS_ = {};
const _SERVICE_NODEJS_SITE_ = {}; // 暂时没用



Ignitor.exec(_SERVICE_IGNITE_STATUS_, _SERVICE_NODEJS_SITE_).then(() => {
    let config = {};

    try {
        Object.assign(config, require(path.resolve('./package.json')).config);
    } catch (e) {
        console.warn('Load package.json failed!')
    }

    const vd = config.vd;
    const port = config.port;
    const app = new koa();

    app.use(koaStaticPlus(resolve('../dist'), { pathPrefix: vd + 'dist' }));

    // app.use(async (ctx) => {
    //     ctx.body = 'hello gendouyun';
    // });

    router(app, vd);

    app.listen(port, () => {
        const message = `load config with: ${JSON.stringify(
            config,
        )}, mount route at ${vd}, start at port ${port}`;
        
        console.log('application message', message);
    });

});
