const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

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

const devBase = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
};

const client = Object.assign(clientBaseConfig, devBase, {
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        default: false,
        defaultVendors: false,
      },
    },
  },
  output: {
    publicPath: '/static/',
    path: path.join(__dirname, '../local/public'),
    filename: '[name].js',
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
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName,
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
      filename: '[name].css',
    }),
  ],
});

const server = Object.assign(serverBaseConfig, devBase, {
  output: {
    path: path.join(__dirname, '../local/server'),
    filename: 'index.js',
  },
  module: serverModule,
  plugins: [
    new CopyPlugin({
      patterns: [{ from: `${staticAssetsPath}/error.html` }],
    }),
    new ServerStartPlugin('./local/server'),
  ],
});

module.exports = [client, server];
