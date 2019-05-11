const fs = require('fs')
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const bulmaDir = /client\/modules\/app/;

const json0 = fs.readFileSync(path.join(__dirname, '../.vscode/launch.json'), {encoding: 'utf8'});
const json1 = JSON.parse(json0);
const appEnvs = json1.configurations[0].env;

const client = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      }
    },
  },
  entry: [
    '@babel/polyfill',
    './client/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../local/public'),
    filename: '[name].js',
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
            plugins: ['@babel/plugin-syntax-dynamic-import']
          },
        }],
      },

      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
        include: bulmaDir,
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(true)
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'ColorPK | Dev',
      template: path.join(__dirname, '../client/template/index.html')
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, '../client/template/404.html'),
        to: path.join(__dirname, '../local/public/404.html')
      },
    ]),
  ],
  watchOptions: {
    ignored: /node_modules/
  },
};

const server = {
  watch: true,
  mode: 'development',
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.js'],
  },
  entry: [
    path.join(__dirname, '../server/entry.js'),
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../local'),
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