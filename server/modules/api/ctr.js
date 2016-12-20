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
  getUserById: function(req, res, next){
    api1List.getUserById({
      qs:{
        id: req.query.id
      }
    }).then((data)=>{
      res.json(helper.resSuccessObj(data));
    }, (data)=>{
      res.json(helper.resFailObj(data));
    });
  }
};