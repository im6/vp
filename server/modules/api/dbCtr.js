'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  _ = require('lodash');


module.exports = {
  initColorList: function(req, res, next){
    mysql.getPool().query('select a.id, a.like, a.color AS `value`, a.author, false as `liked` from color a', function(err, rows, fields){
      res.json(helper.resSuccessObj(rows));
    });
  },
  getColorType: function(req, res, next){
    mysql.getPool().query('select a.id AS `key`, a.name AS `value` from colortype a', function(err, rows, fields){
      res.json(helper.resSuccessObj(rows));
    });
  },
  toggleLike: function(req, res, next){
    let query = `update color set \`like\` = \`like\` ${req.body.willLike ? '+' : '-'}  1 where id = ${req.body.id}`;

    mysql.getPool().query(query, function(err, rows, fields){
      res.json(helper.resSuccessObj(rows));
    });
  },
};