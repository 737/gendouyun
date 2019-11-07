const loaders = require('./loaders');

async function ignite(loader, siteGlobal) {
    let result = false;
    let exception = null;

    try {
        result = await loader.exec(siteGlobal);
    } catch (error) {
        exception = error;
    }

    return {
        result,
        exception,
        tick: Date.now()
    }
}

module.exports = {
    async exec(igniteStatus, siteGlobal) {

        igniteStatus.loaders = {};

        let sucessCount = 0;

        for (let i = 0; i < loaders.length; i++) {
            const loader = loaders[i];
            const loaderResult = await ignite(loader, siteGlobal);

            igniteStatus.loaders[loader.name] = loaderResult.result;

            loaderResult.result && (sucessCount++);
        }

        switch(true) {
            case sucessCount === loaders.length:
                igniteStatus.status = 'sucess';
                break;
            case sucessCount === 0:
                igniteStatus.status = 'fail';
                break;
            default:
                igniteStatus.status = 'partial';
        }
    }
};
