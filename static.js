const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

module.exports = (prefix, dir) => {

    return async (ctx, next) => {
        let rpath = ctx.request.path;

        if (rpath.startsWith(prefix)) {
            let fp = path.join(dir, rpath.substring(prefix.length));

            if (await fs.exists(fp)) {
                ctx.response.type = mime.getType(fp);
                ctx.response.body = await fs.readFile(fp);
            } else {
                console.error(`not fond file ${fp}`);
                ctx.response.status = 404;
            }

        } else {
            await next();
        }
    };
};