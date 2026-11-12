const KoaRouter = require('@koa/router');

module.exports = (koaApp, vd = '/') => {

    const router = new KoaRouter();
    // 兼容 vd 配置：'/' 时直接挂在根路径，其它值（如 '/app'）作为前缀
    const prefix = vd === '/' ? '' : vd.replace(/\/+$/, '');

    // 前端使用 history 路由，未命中静态资源的页面请求统一返回 dist/index.html
    const renderTemplate = (ctx) => {
        const { _SERVICE_NODEJS_CONFIG_: { template } } = ctx.state.global;

        ctx.type = 'text/html';
        ctx.body = template;
    };

    // path-to-regexp v8（@koa/router 14+）不再支持裸 '*'：
    // '/{*path}' 同时匹配 '/' 与多级路径；配置了 vd 前缀时再补一条裸前缀路由
    router.get(`${prefix}/{*path}`, renderTemplate);

    if (prefix) {
        router.get(prefix, renderTemplate);
    }

    koaApp.use(router.routes()).use(router.allowedMethods());
}
