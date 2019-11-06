const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');
const CtripUtil = require('ctriputil');

const clog = require('./utils/log');
const SOAResponse = require('./utils/SOAResponse');

const isProd = process.env.NODE_ENV === 'production';
const { getActiveSpan } = CtripUtil.cat;

const resolve = file => path.resolve(__dirname, file);

const CommonStatus = {
    404: 'method not support',
    500: 'Something broke',
};


function errorHandle(ctx) {
    if (ctx.status === 404) {
        const soa = new SOAResponse({ error: [{ Message: CommonStatus[ctx.status], ErrorCode: ctx.status.toString() }] });
        const errTemplate = fs.readFileSync(resolve('./error.html'), 'utf-8');

        soa.addExt({ Id: 'CLOGGING_TRACE_ID', Value: ctx.response.get('GUID') });

        const span = getActiveSpan();

        if (span && span.__messageId) {
            soa.addExt({ Id: 'RootMessageId', Value: span.__messageId });
        }

        clog.warn({
            type: 'koa', code: ctx.statu, guid: ctx.response.get('GUID'), ClientID: ctx.state.ClientID, ClientIP: ctx.state.ClientIP,
        }, `${CommonStatus[ctx.status]} : ${ctx.originalUrl}`);
        // TODO:无404模板
        ctx.body = errTemplate;
    }
}

module.exports = (koaApp, vd = '/') => {
    const router = new KoaRouter();
    const subRouter = new KoaRouter();

    // 注册 slb 健康检测的路由
    subRouter.get([`slbhealthcheck.html`, `vi/health`], async (ctx, next) => {
        const { _SERVICE_IGNITE_STATUS_ } = ctx.state.global;
        ctx.status = 200;
        ctx.body = JSON.stringify(_SERVICE_IGNITE_STATUS_);
        return;
    });

    subRouter.get('*', (ctx, next) => {
        const { _SERVICE_NODEJS_SITE_: { renderer } } = ctx.state.global;
        let url = ctx.url;
        if (!renderer) {
            ctx.body = 'waiting for compilation.. refresh in a moment.';
            return;
        }

        const context = { title: '携程旅行', url: url };

        return new Promise(((resolve, reject) => {
            renderer.renderToString(
                context,
                (err, html) => {
                    if (err) {
                        if (err.url) {
                            ctx.redirect(err.url);
                        } else if (err.code === 404) {
                            ctx.status = 404;
                            errorHandle(ctx);
                        } else {
                            ctx.status = 500;
                            errorHandle(ctx);
                            clog.error(`error during render : ${ctx.url}`,err.stack);
                        }
                    } else {
                        ctx.type = 'text/html';
                        ctx.body = html;
                    }

                    resolve();
                });
        }));
    });
    router.use(vd,subRouter.routes(),subRouter.allowedMethods());

    koaApp.use(router.routes()).use(router.allowedMethods());
};
