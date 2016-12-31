'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  _ = require('lodash');


module.exports = {
  initColorList: function(req, res, next){
    var qr = 'select a.id, a.like, a.color AS `value`, a.author, false as `liked` from color a';
    mysql.sqlExecOne(qr).then(function(data){
      res.json(helper.resSuccessObj(data));
    }, function(data){
      res.json(helper.resFailObj(data));
    });
  },
  getColorType: function(req, res, next){
    var qr = 'select a.id AS `key`, a.name AS `value` from colortype a';
    mysql.sqlExecOne(qr).then(function(data){
      res.json(helper.resSuccessObj(data));
    }, function(data){
      res.json(helper.resFailObj(data));
    });
  },
  toggleLike: function(req, res, next){
    var qr = `update color set \`like\` = \`like\` ${req.body.willLike ? '+' : '-'}  1 where id = ${req.body.id}`;
    mysql.sqlExecOne(qr).then(function(data){
      res.json(helper.resSuccessObj(data));
    }, function(data){
      res.json(helper.resFailObj(data));
    });
  },
};