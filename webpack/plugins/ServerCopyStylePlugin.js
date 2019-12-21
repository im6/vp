const fs = require('fs');

class ServerCopyStylePlugin {
  constructor({ search, distFile, styleFile }) {
    this.search = search;
    this.distFile = distFile;
    this.styleFile = styleFile;
  }

  apply(compiler) {
    const self = this;

    compiler.hooks.done.tapAsync('ServerCopyStyleHook', (cp, callback) => {
      const cssStyleFile = fs.readFileSync(self.styleFile, 'utf8');
      const content = fs.readFileSync(self.distFile, 'utf8');
      const updated = content.replace(self.search, `'${cssStyleFile}'`);
      fs.writeFileSync(self.distFile, updated);
      callback();
    });
  }
}

module.exports = ServerCopyStylePlugin;
