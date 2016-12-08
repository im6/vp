"use strict";
var webpack = require('webpack'),
  path = require('path'),
  asset = require('./asset');


var baseTemplate = asset.template;

Object.assign(baseTemplate, {
  module: {
    loaders: asset.loaders
  },
  plugins: asset.plugins("build"),
  entry: asset.entry("build"),
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'app.js'
  }
});

module.exports = baseTemplate;