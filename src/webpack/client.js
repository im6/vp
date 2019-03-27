const path = require('path');
const ServerCompilePlugin = require('./plugins/ServerCompilePlugin');
const serverConfig = require('./server');
const { PORT, DEVPORT } = require('../constant');

const antDir = /node_modules\/antd\/es/;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    './src/client/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../../dist'),
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
            plugins: [
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
            ],
          },
        }],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          }
        ],
        include: antDir,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          'less-loader',
        ],
        exclude: antDir,
      },

    ],
  },
  plugins: [
    new ServerCompilePlugin(serverConfig),
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    contentBase: './public', // set 'public' path, relative to root
    noInfo: true,
    hot: true,
    inline: true,
    port: DEVPORT,
    host: 'localhost',
    open: 'Google Chrome',
    proxy: {
      '*': {
        target: `http://localhost:${PORT}`,
        secure: false
      }
    },
    watchOptions: {
      aggregateTimeout: 800,
    }
  },
};