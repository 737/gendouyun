const qconfig = require('@ctrip/qconfig-client');

/**
 * 加载qconfig配置
 *
 * @class QconfigLoader
 */
class QconfigLoader {
    get name() {
        return 'qconfig-loader';
    }

    async exec() {
        await qconfig.init();
        return true;
    }
}

module.exports = QconfigLoader;
