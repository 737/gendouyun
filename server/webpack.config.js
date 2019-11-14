const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = file => path.resolve(__dirname, file);

module.exports = {
    devtool: '#cheap-module-source-map',
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client', './client/app.js']
    },
    output: {
        path: resolve('../dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './server/index.template.html',
            inject: true
        }),
    ]
};
