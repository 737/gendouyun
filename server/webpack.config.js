
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const packageConfig = require('../app.config');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';


module.exports = {
    devtool: '#cheap-module-source-map',
    entry: './src',
    output: {
        path: resolve('../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
    },
    resolve: {
        modules: [resolve('client'), 'node_modules'],
        extensions: ['.js', '.vue'],
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                include: [resolve('../client/icons')],
                loader: 'url-loader?name=icons/[name].[md5:hash:hex:7].[ext]',
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'url-loader',
                exclude: [resolve('../client/icons')],
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(sc|c)ss$/,
                // extract css file from js file, that will reduce the js file size and optimize page loading.
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    }
};
