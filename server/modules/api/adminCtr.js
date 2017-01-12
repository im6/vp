
'use strict';
var globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  oauthApi = require('../../resource/oauth/list'),
  uuid = require('uuid'),
  helper = require('../../misc/helper'),
  _ = require('lodash');

module.exports = {
  getAnonymousColor: function(req, res, next){
    var qr = 'SELECT * FROM color a WHERE a.display = 1';
    mysql.sqlExecOne(qr).then(function(data){
      res.json(helper.resSuccessObj(data));
    }, function(data){
      res.json(helper.resFailObj(data));
    });
  },
  postDecideColor: function(req, res, next){

    let decision = req.body.display,
      id = req.body.id,
      query = null;
    if(decision){
      query = `DELETE FROM color WHERE id = '${id}'`;
    }else{
      query = `UPDATE color SET \`display\` = 0 WHERE id = ${id}`;
    }


    mysql.sqlExecOne(query).then(function(data){
      res.json(helper.resSuccessObj(data));
    }, function(data){
      res.json(helper.resFailObj(data));
    });
  },
};
