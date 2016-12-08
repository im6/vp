"use strict";
var webpack = require('webpack'),
  path = require('path'),
  asset = require('./asset');


var baseTemplate = asset.template;

Object.assign(baseTemplate, {
  module: {
    loaders: asset.loaders
  },
  plugins: asset.plugins("watch"),
  entry: asset.entry("watch"),
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../temp'),
    filename: 'app.js'
  }
});

module.exports = baseTemplate;