'use strict';
var path = require('path'),
    appDir = path.dirname(require.main.filename),
    api1List = require('../../resource/rest/list'),
    helper = require('../../misc/helper');

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