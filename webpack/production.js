const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const { withoutCssModuleFiles } = require('./base');

const client = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: ['./client/index'],
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!error.html'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      filename: '[path]',
      minRatio: 1,
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
};

const server = {
  mode: 'production',
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
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
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: ['isomorphic-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [],
};

module.exports = [client, server];
