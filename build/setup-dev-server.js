const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const chokidar = require('chokidar');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');
const koaDevMiddleware = require('./koa/dev-middleware');
const koaHotMiddleware = require('./koa/hot-middleware');

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    } catch (e) { }
};

// TODO:写得有点乱，待整理
module.exports = function setupDevServer(app, opts) {
    let template;
    let bundle;
    let clientManifest;

    // read template from disk and watch
    template = fs.readFileSync(opts.templatePath, 'utf-8');
    chokidar.watch(opts.templatePath).on('change', () => {
        template = fs.readFileSync(opts.templatePath, 'utf-8');
        console.log('index.template.html template updated.');
        opts.updated(bundle, {
            template,
            clientManifest,
        });
    });

    // modify client config to work with hot middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    );

    // dev middlemare
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false,
        },
    });
    app.use(koaDevMiddleware(devMiddleware));
    clientCompiler.plugin('done', (stats) => {
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        if (stats.errors.length) return;

        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json'
        ));

        opts.updated(bundle, {
            template,
            clientManifest,
        });
    });

    // hot middleware
    const expressHotMiddleware = require('webpack-hot-middleware')(clientCompiler);
    app.use(koaHotMiddleware(expressHotMiddleware));

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));

        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
        opts.updated(bundle, {
            template,
            clientManifest,
        });
    });
};
