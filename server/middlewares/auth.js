'use strict';
var globalConfig = require('../config/env'),
    url = require('url'),
    _ = require('lodash');

module.exports = {
  isAdmin: function(req, res, next){
    let me = this;
    if(req.session.app &&
        req.session.app.isAuth &&
        req.session.app.dbInfo &&
        req.session.app.dbInfo.isAdmin){
      next();
    }else{
      res.json({
        error: true,
        result: 'no auth'
      });
    }
  }

};