module.exports = (globalState = {}) => async (ctx, next) => {
    ctx.state.global = globalState;
    await next();
};
