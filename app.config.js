/**
 * CtripUtil 配置
 */
const envMap = {
    dev: 'fws',
    fws: 'fws',
    fat: 'fws',
    lpt: 'lpt',
    uat: 'uat',
    prod: 'prod',
    prd: 'prod',
};

const pkg = require('./package.json');

const config = pkg.config || /* istanbul ignore next */ {};
const cenv = `${config.env || /* istanbul ignore next */ 'prd'}`.toString().toLowerCase();
const env = envMap[cenv] || /* istanbul ignore next */ 'prod';

module.exports = {
    Redis: null,
    AppID: '100023494',
    qconfig: [],
    Env: env,
    vd: config.vd,
};
