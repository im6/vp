const HOST = '127.0.0.1';
const PORT = '3001';

const path = require('path')

module.exports = {
  watch: true,
  mode: 'development',
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    '@babel/polyfill',
    './src/server/index.js',
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../../dist'),
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }],
      },
    ],
  },
  plugins: [],
  watchOptions: {
    ignored: /node_modules/
  }
};
