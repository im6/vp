const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const bulmaDir = /client\/modules\/app/;

const client = {
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  entry: ['./client/index.js'],
  output: {
    publicPath: '//dkny.oss-cn-hangzhou.aliyuncs.com/2/',
    path: path.join(__dirname, '../dist/public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
        ],
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
              modules: {
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
        exclude: bulmaDir,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      filename: '[path]',
      minRatio: 1,
    }),
    new HtmlWebpackPlugin({
      title: 'ColorPK | Your Best Color Picker, Pal',
      template: path.join(__dirname, '../client/template/index.html'),
      hash: true,
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, '../client/template/404.html'),
        to: path.join(__dirname, '../dist/public/404.html'),
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      },
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
  entry: [path.join(__dirname, '../server')],
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};

module.exports = [client, server];
