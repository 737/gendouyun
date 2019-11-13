const path = require('path');
const webpack = require('webpack');

const resolve = file => path.resolve(__dirname, file);


module.exports = {
    devtool: '#cheap-module-source-map',
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client', './client/app.js']
    },
    output: {
        path: resolve('./dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
