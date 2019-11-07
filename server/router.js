const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');

const resolve = file => path.resolve(__dirname, file);


module.exports = (app, vd = '/') => {
    const router = new KoaRouter();
    const subRouter = new KoaRouter();

    // subRouter.get('*', (ctx, next) => {
    //     const { _SERVICE_NODEJS_SITE_: { renderer } } = ctx.state.global;
    //     let url = ctx.url;
    //     if (!renderer) {
    //         ctx.body = 'waiting for compilation.. refresh in a moment.';
    //         return;
    //     }

    //     const context = { title: '携程旅行', url: url };

    //     return new Promise(((resolve, reject) => {
    //         renderer.renderToString(
    //             context,
    //             (err, html) => {
    //                 if (err) {
    //                     if (err.url) {
    //                         ctx.redirect(err.url);
    //                     } else if (err.code === 404) {
    //                         ctx.status = 404;
    //                         errorHandle(ctx);
    //                     } else {
    //                         ctx.status = 500;
    //                         errorHandle(ctx);
    //                         clog.error(`error during render : ${ctx.url}`,err.stack);
    //                     }
    //                 } else {
    //                     ctx.type = 'text/html';
    //                     ctx.body = html;
    //                 }

    //                 resolve();
    //             });
    //     }));
    // });
    // router.use(vd,subRouter.routes(),subRouter.allowedMethods());

    subRouter.get('*', (ctx, next) => {
        ctx.body = 'hello gendouyun134 user';
    });

    router.use(vd, subRouter.routes(), subRouter.allowedMethods());

    app.use(router.routes()).use(router.allowedMethods());
};
