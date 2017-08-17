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
  plugins: asset.plugins("build1"),
  entry: './client/entry/index_prod.jsx',
  //devtool: 'cheap-module-source-map',
  output: {
    publicPath: 'http://dkny.oss-cn-hangzhou.aliyuncs.com/2/',
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js'
  }
});

module.exports = baseTemplate;