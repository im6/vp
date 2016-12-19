
'use strict';
var path = require('path'),
  helper = require('../../misc/helper'),
  weiboApi = require('../../resource/weibo/list'),
  globalConfig = require('../../config/env'),
  uuid = require('uuid');
  _ = require('lodash');

var client_id = globalConfig.weiboAppKey,
  redirect_uri = globalConfig.weiboRedirectUrl,
  scope = "all";

var privateFn = {
  createWeiboLink: function(state){
    var url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + client_id +
      "&scope=" + scope +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri;
    return url;
  }
};

module.exports = {

  getSessionStatus: function(req, res, next){
    let session = req.session;
    if(!session.app || !session.app.isAuth){
      var stateId = uuid.v1();
      res.json({
        isAuth: false,
        weiboUrl: privateFn.createWeiboLink(stateId)
      });
    }else {
      // do sth tomorrow
      console.log('already signing in...');
      res.json({
        isAuth: true,
      });
    }

  },
  auth: function(req, res, next){
    var qs = req.query; // code and state
    if(qs.code && qs.state){
      // redirected by weibo
      console.log('redirected by weibo...');

      var qsObj = {
        client_id: globalConfig.weiboAppKey,
        client_secret: globalConfig.weiboAppSecret,
        grant_type: 'authorization_code',
        code: qs.code,
        redirect_uri: globalConfig.weiboRedirectUrl
      };

      weiboApi.accessToken({
        qs: qsObj
      }).then(function(data){

        if(data.access_token){

          req.session.app = {
            isAuth: true,
            info: data
          };
          res.redirect("/");
          console.log('successful auth by weibo.com');
        }
      });
    }else{
      res.redirect("/");
    }
  }
};