"use strict";
var webpack = require('webpack');
var path = require('path');
var asset = require('./asset');


var baseTemplate = asset.template;

Object.assign(baseTemplate, {
  module: {
    loaders: asset.loaders
  },
  plugins: asset.plugins("hot"),
  entry: asset.entry("hot"),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'app.js'
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: asset.constant.port,
    host: asset.constant.host
  }
});

module.exports = baseTemplate;