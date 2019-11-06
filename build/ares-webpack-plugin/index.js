/* eslint-disable max-len, func-names, strict */

function AresPlugin(options) {
  options = options || {};
  this.manifestFilename = options.filename || 'manifest.json';
  this.manifestVariable = options.manifestVariable || 'webpackManifest';
}
module.exports = AresPlugin;

AresPlugin.prototype.constructor = AresPlugin;
AresPlugin.prototype.apply = function (compiler) {
  'use strict';

  let oldChunkFilename;
  let chunkManifest;

  compiler.plugin('this-compilation', (compilation) => {
    const mainTemplate = compilation.mainTemplate;
    mainTemplate.plugin('require-ensure', function (_, chunk, hash) {
      const filename = this.outputOptions.chunkFilename || this.outputOptions.filename;

      if (filename) {
        chunkManifest = [chunk].reduce(function registerChunk(manifest, c) {
          if (c.id in manifest) return manifest;

          if (c.hasRuntime()) {
            manifest[c.id] = undefined;
          } else {
            manifest[c.id] = `$ARES_URL('${mainTemplate.applyPluginsWaterfall('asset-path', filename, {
              hash,
              chunk: c,
            })}')`;
          }
          return c.chunks.reduce(registerChunk, manifest);
        }, {});
        oldChunkFilename = this.outputOptions.chunkFilename;
        this.outputOptions.chunkFilename = '__CHUNK_MANIFEST__';
      }

      return _;
    });
  });

  compiler.plugin('compilation', (compilation) => {
    compilation.mainTemplate.plugin('require-ensure', function (_, chunk, hash, chunkIdVar) {
      if (oldChunkFilename) {
        this.outputOptions.chunkFilename = oldChunkFilename;
      }
      const manifestStr = JSON.stringify(chunkManifest).replace(/"(\$ARES_URL\(.*?\))"/g, '$1');
      return _.replace('__webpack_require__.p + "__CHUNK_MANIFEST__"', `${manifestStr}[${chunkIdVar}]`);
    });
  });
};
