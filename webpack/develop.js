const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServerStartPlugin = require('./plugins/ServerStartPlugin');

const {
  withoutCssModuleFiles,
  clientBaseConfig,
  serverBaseConfig,
  localIdentName,
  staticAssetsPath,
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
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
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
            options: {
              hmr: true,
            },
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
            options: {
              hmr: true,
            },
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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
    new CopyWebpackPlugin([
      { from: `${staticAssetsPath}/error.html` },
      { from: `${staticAssetsPath}/favicon.ico` },
      { from: `${staticAssetsPath}/robots.txt` },
      { from: `${staticAssetsPath}/sitemap.xml` },
    ]),
    new ServerStartPlugin('./local/server'),
  ],
});

module.exports = [client, server];
