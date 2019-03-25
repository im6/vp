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
          console.error(err.details);
        }
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
      })
    });
  }
}

module.exports = ServerWatchingPlugin;