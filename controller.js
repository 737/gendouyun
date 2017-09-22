const { each } = require('lodash');
const Router = require('koa-router');
const fs = require('fs');
const router = new Router();

function addController(sDirPath, oRouter) {
    var allJsName = fs.readdirSync(sDirPath);
    
    allJsName.filter(v => {
        return v.endsWith('.js');
    });

    allJsName.forEach( name => {
        let jsPath = sDirPath + '/' + name;
        let contr = require(jsPath);

        each(contr, (fn, rule) => {
            let path = rule.substring(4);

            if (rule.startsWith('GET ')) {
                oRouter.get(path, fn);
            } else if (rule.startsWith('POST ')) {
                oRouter.post(path, fn);
            } else {
                console.log(`invalid URL: ${rule}`);
            }
        });
    });
};

module.exports = dirPath => {
    dirPath = dirPath || './controller';

    addController(dirPath, router);

    return router.routes();
};