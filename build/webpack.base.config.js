require('./check-versions')();
require('./build-log')();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const happypackConfig = require('./happypack.conf');
const vueLoaderConfig = require('./vue-loader.conf');
const packageConfig = require('../app.config');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: resolve('../dist'),
        publicPath: isProd ? `${packageConfig || ''}/dist/` : '/dist/', // TODO:替换成ares后替换成ares地址
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        modules: [resolve('client'), 'node_modules'],
        extensions: ['.js', '.vue'],
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // loader: 'happypack/loader?id=vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=js-loader',
                exclude: /node_modules/,
            },
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
                use: isProd
                    ? ExtractTextPlugin.extract({
                          fallback: 'vue-style-loader',
                          use: [
                              {
                                  loader: 'css-loader',
                                  options: { minimize: true },
                              },
                              'sass-loader',
                          ],
                      })
                    : ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    plugins: happypackConfig
        .concat(
            isProd
                ? [
                      new webpack.optimize.UglifyJsPlugin({
                          compress: { warnings: false },
                      }),
                      new webpack.optimize.ModuleConcatenationPlugin(),
                      new webpack.IgnorePlugin(/ctriputil$/),
                  ]
                : [new FriendlyErrorsPlugin()],
        )
        .concat([new VueLoaderPlugin(), new ExtractTextPlugin('style.[chunkhash].css')]),
};

if (process.env.npm_config_report) {
    //打包后模块大小分析//npm run build --report
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    baseConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = baseConfig;
