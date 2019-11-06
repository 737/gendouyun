const log4js = require('log4js');
const config = require('../../app.config');

log4js.configure({
    appenders: {
        cat: {
            type: '@ctrip/cat-appender',
        },
        clog: {
            type: '@ctrip/clog-appender',
        },
        file: {
            type: 'dateFile',
            filename:
                config.env !== 'prod'
                    ? 'd:/Log/100023494/h5-official-node-run'
                    : '/opt/logs/100023494/h5-official-node-run',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 31457280,
        },
    },
    categories: {
        debugLog: {
            appenders: ['cat', 'clog'],
            level: 'info',
        },
        runLog: {
            appenders: ['cat', 'clog', 'file'],
            level: 'warn',
        },
        errorLog: {
            appenders: ['cat', 'clog', 'file'],
            level: 'error',
        },
        default: {
            appenders: ['cat', 'clog', 'file'],
            level: 'warn',
        },
    },
    pm2: config.env === 'prod',
});

const defaultAddInfo = () => {
    return {
        appId: config.AppID,
        build: {},
        lang: 'nodejs',
        timestamp: +Date.now(),
    };
};

function resolveLogArgs(title, message, addInfo) {
    const args = [title];
    if (message && typeof message === 'string') {
        args[1] = {
            message,
            addInfo: Object.assign(defaultAddInfo(), addInfo),
        };
    } else if (message && typeof message === 'object') {
        args[1] = message;
    }
    return args;
}

module.exports = {
    debug: (title, message, addInfo) => {
        const logger = log4js.getLogger('debugLog');
        logger.debug(...resolveLogArgs(title, message, addInfo));
    },
    info: (title, message, addInfo) => {
        const logger = log4js.getLogger('debugLog');
        logger.info(...resolveLogArgs(title, message, addInfo));
    },
    warn: (title, message, addInfo) => {
        const logger = log4js.getLogger('runLog');
        logger.warn(...resolveLogArgs(title, message, addInfo));
    },
    error: (title, message, addInfo) => {
        const logger = log4js.getLogger('errorLog');
        logger.error(...resolveLogArgs(title, message, addInfo));
    },
    fatal: (title, message, addInfo) => {
        const logger = log4js.getLogger('errorLog');
        logger.fatal(...resolveLogArgs(title, message, addInfo));
    },
};
