const os = require('os');
const KoaRouter = require('@koa/router');

module.exports = (koaApp, vd = '/') => {

    const router = new KoaRouter();
    // 兼容 vd 配置：'/' 时直接挂在根路径，其它值（如 '/app'）作为前缀
    const prefix = vd === '/' ? '' : vd.replace(/\/+$/, '');

    // 前端使用 history 路由，未命中静态资源的页面请求统一返回 dist/index.html
    const renderTemplate = (ctx) => {
        // 构建产物目录没命中就是真的 404，不能回退成首页（否则浏览器会把 HTML 当 JS 解析）
        if (ctx.path.startsWith('/assets/')) {
            ctx.throw(404, 'asset not found');
        }

        const { _SERVICE_NODEJS_CONFIG_: { template } } = ctx.state.global;

        if (!template) {
            ctx.throw(503, 'template not loaded');
        }

        ctx.type = 'text/html';
        ctx.body = template;
    };

    // 健康检查：给 Caddy 的 health_uri 与发布脚本用，固定挂在根路径，不受 vd 影响
    const health = (ctx) => {
        ctx.set('Cache-Control', 'no-store');
        ctx.type = 'application/json; charset=utf-8';
        ctx.body = {
            status: 'ok',
            release: process.env.RELEASE || 'dev',
            host: os.hostname(),
            pid: process.pid,
            uptime: Math.round(process.uptime()),
            node: process.version,
            time: new Date().toISOString(),
        };
    };

    router.get('/healthz', health);
    router.head('/healthz', health);

    // path-to-regexp v8（@koa/router 14+）不再支持裸 '*'：
    // '/{*path}' 同时匹配 '/' 与多级路径；配置了 vd 前缀时再补一条裸前缀路由
    router.get(`${prefix}/{*path}`, renderTemplate);

    if (prefix) {
        router.get(prefix, renderTemplate);
    }

    koaApp.use(router.routes()).use(router.allowedMethods());
}
