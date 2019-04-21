const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

const antDir = /node_modules\/antd\/es/;
const bulmaDir = /node_modules\/bulma\/sass/;

const json0 = fs.readFileSync(path.join(__dirname, '../.vscode/launch.json'), {encoding: 'utf8'});
const json1 = JSON.parse(json0)
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
            plugins: [
              ["import", { 
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": true
              }]
            ],
          },
        }],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          }
        ],
        include: antDir,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          'less-loader',
        ],
        exclude: antDir,
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