const path = require('path');
const nodeExternals = require('webpack-node-externals');

const resolve = {
  extensions: ['.js', '.jsx'],
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    containers: path.resolve(__dirname, '../src/containers'),
  },
};

exports.withoutCssModuleFiles = [
  /bulma.modules.sass/,
  /SpinLoader\/style.sass/,
];

exports.clientBaseConfig = {
  resolve,
  entry: path.join(__dirname, '../src/client'),
};

exports.serverBaseConfig = {
  target: 'node',
  resolve,
  externals: [nodeExternals()],
  entry: path.join(__dirname, '../src/server'),
};

exports.localIdentName = '[hash:base64:5]';
