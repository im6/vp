const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  withoutCssModuleFiles,
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
  staticAssetsPath,
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
                localIdentName,
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
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      filename: '[path]',
      minRatio: 1,
    }),
    new webpack.DefinePlugin({
      'process.env.lastBuildDate': JSON.stringify(
        `${new Date().toLocaleString()} UTC`
      ),
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
    path: path.join(__dirname, '../dist/server'),
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
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                localIdentName,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.lastBuildDate': JSON.stringify(
        `${new Date().toLocaleString()} EST`
      ),
    }),
    new CopyWebpackPlugin([
      { from: `${staticAssetsPath}/error.html` },
      { from: `${staticAssetsPath}/favicon.ico` },
      { from: `${staticAssetsPath}/robots.txt` },
      { from: `${staticAssetsPath}/sitemap.xml` },
    ]),
  ],
});

module.exports = [client, server];
