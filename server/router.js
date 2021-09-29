const KoaRouter = require('koa-router');

module.exports = (koaApp, vd = '/') => {

    const router = new KoaRouter();
    const subRouter = new KoaRouter();


    // const templatePath = resolve('../dist/index.html');
    //     var stream = fs.readFileSync(
    //         templatePath,
    //         'utf-8',
    //     );

    subRouter.get('*', (ctx, next) => {
        const { _SERVICE_NODEJS_CONFIG_: { template, vd } } = ctx.state.global;

        ctx.type = 'text/html';
        ctx.body = template;
    })

    router.use(vd, subRouter.routes(), subRouter.allowedMethods());

    koaApp.use(router.routes()).use(router.allowedMethods());
}