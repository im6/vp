const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

const bulmaDir = /client\/modules\/app/;

const json0 = fs.readFileSync(path.join(__dirname, '../.vscode/launch.json'), {encoding: 'utf8'});
const json1 = JSON.parse(json0);
const appEnvs = json1.configurations[0].env;

const client = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', 'sass'],
  },
  entry: [
    '@babel/polyfill',
    './client/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist/public'),
    filename: 'bundle.js',
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
          },
        }],
      },

      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
        include: bulmaDir,
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
        exclude: bulmaDir,
      },

    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV === 'development')
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};

const server = {
  watch: true,
  mode: 'development',
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    path.join(__dirname, '../server/entry.js'),
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
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
            presets: ['@babel/preset-env'],
            plugins: [],
          },
        }],
      },
    ],
  },
  plugins: [
    new ServerStartPlugin(appEnvs),
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = [client, server];