const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const base = require('./base');

const HOST = '127.0.0.1';
const PORT = '3001';

Object.assign(base, {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './client/entry/index.jsx',
    'webpack/hot/only-dev-server',
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Starter HOT DEV',
      template: 'client/template/index.html',
      hash: true,
      showErrors: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devServer: {
    contentBase: './public',
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    proxy: {
      '*': {
        target: 'http://localhost:3000', // NOTE: your express.js server port number
        secure: false,
      },
    },
  },
});

module.exports = base;
