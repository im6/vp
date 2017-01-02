
'use strict';
var globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  weiboApi = require('../../resource/weibo/list'),
  facebookApi = require('../../resource/facebook/list'),
  uuid = require('uuid'),
  helper = require('../../misc/helper'),
  _ = require('lodash');


var redirect_uri_wb = globalConfig.oauthRedirectDomin + '/api/weiboLogin',
  redirect_uri_fb = (globalConfig.isDev? 'http://localhost:4000': globalConfig.oauthRedirectDomin) + '/api/facebookLogin',

  scope = "all";

var privateFn = {
  createWeiboLink: function(state){
    var url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + globalConfig.weiboAppKey +
      "&scope=" + scope +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri_wb;
    return url;
  },
  createFacebookLink: function(state){
    var url = "https://www.facebook.com/v2.8/dialog/oauth?" +
      "client_id=" + globalConfig.facebookAppKey +
      "&response_type=code" +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri_fb;
    return url;
  },
  checkUserInfo: function(oauth, uid){
    var qr = `SELECT * FROM user WHERE oauth = '${oauth}' AND oauthid = ${uid}`;
    return mysql.sqlExecOne(qr);
  },
  createNewUser: function(oauth, name, id){
    var qr = `INSERT INTO user (oauth, name, oauthid, lastlogin) VALUES ('${oauth}', '${name}', '${id}', NOW())`;
    return mysql.sqlExecOne(qr);
  },
  addUserLike: function(userid, colorid){
    var qr = `INSERT INTO userlike (userid, colorid) VALUES ('${userid}', '${colorid}')`;
    return mysql.sqlExecOne(qr);
  },
  removeUserLike: function(userid, colorid){
    var qr = `DELETE FROM userlike WHERE userid= '${userid}' AND colorid = '${colorid}'`;
    return mysql.sqlExecOne(qr);
  },
  getUserLike: function(userid){
    var qr = `SELECT colorid FROM userlike WHERE userid= '${userid}'`;
    return mysql.sqlExecOne(qr);
  },

  convertOauthIntoLocalDB: function(oauthType, session, data, res){
    let me = this;
    var like = [];

    var imgUrl = oauthType == 'wb' ? data.profile_image_url : data.picture.data.url;

    me.checkUserInfo(oauthType, data.id).then(function(row1){
      if(row1.length < 1){
        me.createNewUser(oauthType, data.name, data.id).then(function(row2){

          session.app.dbInfo = {
            id: row2.insertId,
            name: data.name,
            isAdmin: false
          };

          res.json({
            isAuth: true,
            like: like,
            profile: {
              id: data.id,
              name: data.name,
              img: imgUrl,
              isAdmin: false
            }
          });
        }, function(row2error){
          console.error('create user error');
        });

      }else{

        session.app.dbInfo = {
          id: row1[0].id,
          name: data.name,
          isAdmin: row1[0].isadmin || false
        };

        me.getUserLike(row1[0].id).then(function(row2){
          like = row2.map(function(v,k){
            return v.colorid;
          });
          res.json({
            isAuth: true,
            like: like,
            profile: {
              id: data.id,
              name: data.name,
              img: imgUrl,
              isAdmin: session.app.dbInfo.isAdmin
            }
          });
        });
      }
    });
  }
};


module.exports = {
  getInitAuth: function(req, res, next){
    let session = req.session;

    if(!session.app || !session.app.isAuth){
      var stateId = uuid.v1();
      req.session.app = {
        isAuth: false,
        oauthState : stateId
      };

      console.log('initial session!');

      res.json({
        isAuth: false,
        weiboUrl: privateFn.createWeiboLink(stateId),
        facebookUrl: privateFn.createFacebookLink(stateId)
      });
    }
    else {
      res.json({
        isAuth: true
      });
    }
  },
  getUserInfo: function(req, res, next){
    let session = req.session;
    if(!session.app || !session.app.isAuth){
      var stateId = uuid.v1();
      req.session.app = {
        isAuth: false,
        oauthState : stateId
      };

      res.json({
        isAuth: false
      });
    }
    else {

      console.log('already signing in...');

      //===========v

      var qsWb = {
        access_token: session.app.tokenInfo.access_token,
        uid: session.app.tokenInfo.uid
      };

      var qsFb = {
        access_token: session.app.tokenInfo.access_token,
        fields: 'id,name,picture'
      };

      var qsObj = session.app.oauth === 'wb' ? qsWb : (session.app.oauth === 'fb' ? qsFb : null);
      if(!qsObj){
        console.error('session set error on authed users.');
        return;
      }

      var  sourceApi = session.app.oauth === 'wb' ? weiboApi : facebookApi;
      sourceApi.showUser({
        qs:qsObj
      }).then(function(data){

        privateFn.convertOauthIntoLocalDB(session.app.oauth, session, data, res)

      }, function(data){
        res.json({
          isAuth: false
        });
      });
      //===========^

    }
  },

  facebookLogin: function(req, res, next){
    var qs = req.query; // code and state

    if(qs.code &&
      qs.state &&
      req.session.app &&
      qs.state === req.session.app.oauthState){
      console.log('redirected by facebook auth...');

      var qsObj = {
        client_id: globalConfig.facebookAppKey,
        client_secret: globalConfig.facebookAppSecret,
        code: qs.code,
        redirect_uri: redirect_uri_fb
      };

      facebookApi.accessToken({
        qs: qsObj
      }).then(function(data){
        if(data.access_token){
          req.session.app = {
            oauth: 'fb',
            isAuth: true,
            tokenInfo: data
          };

          res.redirect("/");
        }
      });
    }else{
      // invalid weibo auth request
      res.redirect("/");
    }
  },

  weiboLogin: function(req, res, next){
    var qs = req.query;

    if(qs.code &&
      qs.state &&
      req.session.app &&
      qs.state === req.session.app.oauthState){
      // redirected by weibo
      console.log('redirected by weibo auth...');

      var qsObj = {
        client_id: globalConfig.weiboAppKey,
        client_secret: globalConfig.weiboAppSecret,
        grant_type: 'authorization_code',
        code: qs.code,
        redirect_uri: redirect_uri_wb
      };

      weiboApi.accessToken({
        qs: qsObj
      }).then(function(data){

        if(data.access_token){
          req.session.app = {
            oauth: 'wb',
            isAuth: true,
            tokenInfo: data
          };
          res.redirect("/");
        }
      });
    }else{
      // invalid weibo auth request
      res.redirect("/");
    }
  },
  logoff: function(req, res, next){
    console.log('logoff and delete session');
    delete req.session.app;
    res.json({
      error: false
    })
  },
  initColorList: function(req, res, next){
    var qr = 'select a.id, a.like, a.color AS `value`, a.username as `name`, false as `liked` from color a';
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

    if(req.session.app && req.session.app.isAuth){
      if(req.body.willLike){
        privateFn.addUserLike(req.session.app.dbInfo.id, req.body.id);
      } else {
        privateFn.removeUserLike(req.session.app.dbInfo.id, req.body.id);
      }
    }
  },

  addNewColor: function(req, res, next){
    let hasAuth = req.session.app && req.session.app.isAuth;
    let username = (hasAuth && req.session.app.dbInfo.name)? `'${req.session.app.dbInfo.name}'` : 'NULL';
    let userid = (hasAuth && req.session.app.dbInfo.id)? `${req.session.app.dbInfo.id}` : 'NULL';
    let displayItem = userid == 'NULL' ? 1 : 0;
    var qr = `INSERT INTO color (\`like\`, color, userid, username, colortype, display, createdate) VALUES (0, '${req.body.value}', ${userid}, ${username}, '${req.body.colorType}', ${displayItem}, NOW())`;

    mysql.sqlExecOne(qr).then(function(row){
      res.json(helper.resSuccessObj({
        id:row.insertId,
        name: hasAuth ? req.session.app.dbInfo.name : null
      }));
    }, function(err){
      res.json(helper.resFailObj(err));
    });
  },
};