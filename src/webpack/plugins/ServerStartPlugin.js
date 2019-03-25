const { spawn } = require('child_process');

class ServerStartPlugin {
  constructor(options) {
    this.options = options;
    this.child = null;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('ServerStartHook', (cp, callback) => {
      this.child && this.child.kill('SIGTERM');
      this.child = spawn('node', ['./dist/server.js'], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false,
      });
      console.log('[server]: start server');
      callback();
    });
  }
}

module.exports = ServerStartPlugin;