const QconfigLoader = require('./qconfig-loader');
const TemplateLoader = require('./template-loader');

module.exports = [
    new QconfigLoader(),
    new TemplateLoader(),
];
