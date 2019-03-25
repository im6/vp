const webpack = require('webpack');

class ServerWatchingPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('ServerWatchPluginHook', (cp) => {
      console.log('[server]: compile server');
      webpack(this.options, (err, stats) => {
        if(err){
          console.error('[server]: webpack error');
          console.log(err);
        }
      })
    });
  }
}

module.exports = ServerWatchingPlugin;