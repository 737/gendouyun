const fs = require('fs');
const path = require('path');

module.exports = function() {
    let config = {};
    config = require('../package.json').config;
    const vd = config.vd ? config.vd : '/';
    fs.writeFileSync(
        path.join(process.cwd(), 'build.json'),
        JSON.stringify({
            build: Date.now(),
            vd: vd,
        }),
    );
};
