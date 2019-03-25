const path = require('path')
const nodeExternals = require('webpack-node-externals');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

module.exports = {
  watch: true,
  mode: 'development',
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    './src/server/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../../dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              "@babel/plugin-proposal-class-properties"
            ],
          },
        }],
      },
    ],
  },
  plugins: [
    new ServerStartPlugin(),
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};
