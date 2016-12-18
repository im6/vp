'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  weiboApi = require('../../resource/weibo/list'),
  globalConfig = require('../../config/env'),
  _ = require('lodash');


module.exports = {
  test: function(req, res, next){
    res.json({
      msg: "test succesfully",
      error: false
    });
  },
};