const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const {
  withoutCssModuleFiles,
  clientBaseConfig,
  serverBaseConfig,
} = require('./base');

const client = Object.assign(clientBaseConfig, {
  mode: 'production',
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
        include: withoutCssModuleFiles,
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
        exclude: withoutCssModuleFiles,
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
      exclude: 'main.css',
    }),
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
});

const server = Object.assign(serverBaseConfig, {
  mode: 'production',
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
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: ['null-loader'],
      },
    ],
  },
  plugins: [],
});

module.exports = [client, server];
