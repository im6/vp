const path = require('path');
const nodeExternals = require('webpack-node-externals');

exports.withoutCssModuleFiles = [
  /client\/modules\/app\/bulma.modules.sass/,
  /isomorphic\/SpinLoader\/style.sass/,
];

exports.clientBaseConfig = {
  entry: path.join(__dirname, '../client'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

exports.serverBaseConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.join(__dirname, '../server'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
