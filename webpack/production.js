const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { version } = require('../package.json');

const {
  withoutCssModuleFiles,
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
  staticAssetsPath,
  include,
  sassLoader,
  serverModule,
} = require('./base');

const prodBase = {
  mode: 'production',
  performance: {
    hints: 'warning',
  },
};

const client = Object.assign(clientBaseConfig, prodBase, {
  output: {
    publicPath: `https://cdn.jsdelivr.net/gh/im6/vp@v${version}/dist/public/`,
    path: path.join(__dirname, '../dist/public'),
    filename: '[name].js', // '[name].js?[contenthash]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        use: ['babel-loader'],
      },
      {
        test: /\.sass$/,
        include: withoutCssModuleFiles,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          sassLoader,
        ],
      },
      {
        test: /\.sass$/,
        exclude: withoutCssModuleFiles.concat([/node_modules/]),
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          sassLoader,
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css', // '[name].css?[contenthash]',
    }),
    new CssMinimizerPlugin(),
    new CompressionPlugin({
      exclude: /.*/, // use CDN instead of OSS, so exclude all files temporarily
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
      chunks: 'async',
      cacheGroups: {
        default: false,
        defaultVendors: false,
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
});

const server = Object.assign(serverBaseConfig, prodBase, {
  output: {
    path: path.join(__dirname, '../dist/server'),
    filename: 'index.js',
  },
  module: serverModule,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.lastBuildDate': JSON.stringify(
        `${new Date().toLocaleString()} EST`
      ),
    }),
    new CopyPlugin({
      patterns: [
        { from: `${staticAssetsPath}/error.html` },
        { from: `${staticAssetsPath}/favicon.ico` },
        { from: `${staticAssetsPath}/robots.txt` },
        { from: `${staticAssetsPath}/sitemap.xml` },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
});

module.exports = [client, server];
