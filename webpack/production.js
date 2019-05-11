const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        }],
      },

      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': JSON.stringify(false)
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'ColorPK | Your best color picker, pal',
      template: path.join(__dirname, '../client/template/index.html'),
      hash: true,
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, '../client/template/404.html'),
        to: path.join(__dirname, '../dist/public/404.html')
      },
    ]),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      }
    },
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