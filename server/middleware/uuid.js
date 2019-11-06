const uuidv4 = require('uuid/v4');

/**
 * 为每一个请求添加一个唯一的GUID,方便将日志串连在一起
 */
module.exports = async (ctx, next) => {
    const GUID = (ctx.reponse && ctx.reponse.get('GUID')) || (ctx.header && ctx.header.guid) || uuidv4();
    ctx.set('GUID', GUID);
    await next();
};
