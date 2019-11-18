const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

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
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.(sc|c)ss$/,
            loader: ['vue-style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './server/index.template.html',
            inject: true
        }),
        new VueLoaderPlugin()
    ]
};
