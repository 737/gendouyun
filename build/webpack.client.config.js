const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');

const config = merge(base, {
    entry: {
        app: './client/entry-client.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync']
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // a module is extracted into the vendor chunk if...
                return (
                    // it's inside node_modules
                    /node_modules/.test(module.context)
                    // and not a CSS and SCSS file (due to extract-text-webpack-plugin limitation)
                    && !/\.(css|scss)$/.test(module.request)
                );
            },
        }),
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new VueSSRClientPlugin(),
    ],
});

module.exports = config;
