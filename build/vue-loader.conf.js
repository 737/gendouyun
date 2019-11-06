const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    loaders: {
        scss: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: { minimize: true },
                },
                {
                    loader: 'postcss-loader?sourceMap',
                    options: {
                        plugins: () => [autoprefixer({
                            browsers: ['last 2 versions']
                        })]
                    }
                },
                'sass-loader'
            ]
        }),
    },
    compilerOptions: {
        preserveWhitespace: false,
    },
    cssModules: {
        localIdentName: '[path][name]---[local]---[hash:base64:5]',
        camelCase: true
    },
    extractCSS: true
}
