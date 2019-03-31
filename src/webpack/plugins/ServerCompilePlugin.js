const webpack = require('webpack');

class ServerWatchingPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('ServerWatchPluginHook', (cp) => {
      console.log('[server]: compile server');
      webpack(this.options, (err, stats) => {
        if(err || stats.hasErrors()){
          console.log(err.toString({
            chunks: false,
            colors: true
          }))
          console.log(stats)
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