

module.exports = {
    create: name => async (ctx, next) => {
        try {
            const func = require(`./${name}`);

            await func(ctx, next);
        } catch (error) {
            const err = {
                middleware: name,
                url: ctx.href,
                error: error.toString(),
                header: ctx.header
            };

            console.error(JSON.stringify(err));
        }

    }
};