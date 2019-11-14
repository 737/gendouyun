
const path = require('path');
const koa = require('koa');
const koaStaticPlus = require('koa-static-plus');
const Router = require('koa-router');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');

const resolve = file => path.resolve(__dirname, file);
const template = require('./template.js');
const router = new Router();

let config = {};

try {
    Object.assign(config, require(path.resolve('./package.json')).config);
} catch (e) {
    console.warn('Load package.json failed!')
}

const vd = config.vd;
const port = config.port;
const app = new koa();

// app.use(koaStaticPlus(resolve('../dist'), { pathPrefix: vd + 'dist' }));

const complier = webpack(webpackConfig);

complier.plugin('done', (stats) => {
    console.log('done')
});

const devMiddleware = (complier, ops) => {
    const middleware = webpackDevMiddleware(complier, ops);

    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content;
            },
            setHeader: (name, value) => {
                ctx.set(name, value);
            }
        }, next)
    }
};

const hotMiddleware = (complier, ops) => {
    const middleware = webpackHotMiddleware(complier, ops);

    return (ctx, next) => {
        return new Promise((resolve) => {
            middleware(ctx.req, ctx.res, resolve);
        }).then(next);
    }
};

app.use(devMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath
}));
app.use(hotMiddleware(complier));


app.use(router.routes());

app.listen(port, () => {
    const message = `load config with: ${JSON.stringify(
        config,
    )}, mount route at ${vd}, start at port ${port}`;

    console.log('application message', message);
});


