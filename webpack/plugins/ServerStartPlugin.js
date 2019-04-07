const { spawn } = require('child_process');

class ServerStartPlugin {
  constructor(options) {
    this.options = options;
    this.child = null;
  }

  onStdOut(data){
    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('ServerStartHook', (cp, callback) => {
      this.child && this.child.kill('SIGTERM');
      this.child = spawn('node', ['./dist/server.js'], {
        env: Object.assign({ 
          NODE_ENV: 'development',
        }, process.env),
        silent: false,
      });
      console.log('[server]: start server');
      this.child.stdout.on('data', this.onStdOut);
      this.child.stderr.on('data', x => process.stderr.write(x));
      callback();
    });
  }
}

module.exports = ServerStartPlugin;