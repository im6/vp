"use strict";
var webpack = require('webpack'),
  path = require('path'),
  asset = require('./asset');


var baseTemplate = asset.template;

Object.assign(baseTemplate, {
  module: {
    loaders: asset.loaders
  },
  externals : {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: asset.plugins("build"),
  entry: asset.entry("build"),
  //devtool: 'cheap-module-source-map',
  output: {
    publicPath: 'http://dkny.oss-cn-hangzhou.aliyuncs.com/2/',
    path: path.join(__dirname, '../../dist'),
    filename: '[name].js'
  }
});

module.exports = baseTemplate;