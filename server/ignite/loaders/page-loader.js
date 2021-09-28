const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

/**
 * 加载新应用页面配置
 *
 * @class PageLoader
 */
class PageLoader {
    get name() {
        return 'page-loader';
    }

    async exec(siteGlobal) {
        const config = fs.readFileSync(resolve('../../../pages.json'));
        const { pages = [] } = JSON.parse(config) || {};

        siteGlobal.pageConfig = pages
            .map((page = {}) => {
                const { path = '' } = page;
                const arr = path.split('/');

                return arr[1] ? arr[1] : '';
            })
            .filter(item => item);

        return true;
    }
}

module.exports = PageLoader;
