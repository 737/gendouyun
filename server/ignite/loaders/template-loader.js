const path = require('path');
const fs = require('fs');

const resolve = file => path.resolve(__dirname, file);

const getIPAddress = () => {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];

            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }

    return '1.0.0.0';
}

/**
 * 加载应用根模板
 *
 * @class TemplateLoader
 */
class TemplateLoader {
    get name() { return 'template-loader'; }

    async exec(nodeJsConfig) {
        const templatePath = resolve('../../../dist/index.html');
        var stream = fs.readFileSync(
            templatePath,
            'utf-8',
        );

        nodeJsConfig.template = stream.replace(/<[^<]*id="page_ip"[^>]*>/gi, `<input type="hidden" id="page_ip" value="${getIPAddress()}" />`);

        return true;
    }
}

module.exports = TemplateLoader;
