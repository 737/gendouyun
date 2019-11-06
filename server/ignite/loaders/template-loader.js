const path = require('path');

const resolve = file => path.resolve(__dirname, file);

/**
 * 加载应用根模板
 *
 * @class TemplateLoader
 */
class TemplateLoader {
    get name() { return 'template-loader'; }

    async exec(siteGlobal) {
        siteGlobal.templatePath = resolve('../../index.template.html');

        return true;
    }
}

module.exports = TemplateLoader;
