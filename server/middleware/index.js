const clog = require('../utils/log');

module.exports = {
    create: name => async (ctx, next) => {
        const { _SERVICE_NODEJS_CONFIG_ = {} } = ctx.state.global;
        try {
            _SERVICE_NODEJS_CONFIG_.env === 'DEV' && console.log(name);
            const func = require(`./${name}`);
            await func(ctx, next);
        } catch (e) {
            _SERVICE_NODEJS_CONFIG_.env === 'DEV' && console.log(e);
            const errorTags = {
                middleware: name,
                url: ctx.href,
            };
            Object.assign(errorTags, ctx.header);
            clog.error(e.toString(), e.stack, errorTags);
        }
    },
};
