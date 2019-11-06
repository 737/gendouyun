const os = require('os');
const HappyPack = require('happypack');

const vueLoaderConfig = require('./vue-loader.conf');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = [
    new HappyPack({
        id: 'js-loader',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        verbose: true,
    }),
    // new HappyPack({
    //     id: 'vue-loader',
    //     loaders: ['vue-loader'],
    //     threadPool: happyThreadPool,
    //     verbose: true,
    // }),
    // new HappyPack({
    //     loaders: [{
    //         path: 'vue-loader',
    //         query: {
    //             vueLoaderConfig
    //         }
    //     }]
    // })
];
