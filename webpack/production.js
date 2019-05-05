const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const bulmaDir = /client\/modules\/app/;

const client = {
  mode: 'production',
  resolve: {
    extensions: ['.js'],
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
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': JSON.stringify(false)
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};

const server = {
  mode: 'production',
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
  plugins: [],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};

module.exports = [client, server];