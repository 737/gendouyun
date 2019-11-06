const clog = require('../utils/log');
const { ContextExt } = require('../utils/ContextExt');

function setup(ctx) {
    // 初始化
    ctx.state.times = [
        ['setupBegin', Date.now()],
    ];

    Object.assign(ctx, ContextExt);

    ctx.state.ClientID = ctx.getClientID();
    ctx.state.ClientIP = ctx.getClientIP();

    // 输出符合SOA要求的JSON格式的内容
    // ctx.state.soa = SOA;

    // 记录前端POST过来的内容
    clog.info({
        type: 'request',
        guid: ctx.response && ctx.response.get('GUID'),
        ClientIP: ctx.state.ClientIP,
        ClientID: ctx.state.ClientID,
        source: 'javascript',
    }, `request ${ctx.originalUrl}`, `Body:${JSON.stringify(ctx.body)}`, `Cookie:${JSON.stringify(ctx.get('cookie'))}`);

    ctx.logTime('setupEnd');
}

/**
 * 对指定 vd 下的路由进行包装, 增加常用的属性及方法
 */
module.exports = async (ctx, next) => {
    setup(ctx);
    await next();
};
