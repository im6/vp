
'use strict';
var globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  oauthApi = require('../../resource/oauth/list'),
  uuid = require('uuid'),
  helper = require('../../misc/helper'),
  _ = require('lodash');


var redirect_uri_wb = globalConfig.oauthRedirectDomin + '/api/login/wb',
  redirect_uri_fb = (globalConfig.isDev? 'http://localhost:4000': globalConfig.oauthRedirectDomin) + '/api/login/fb';

var privateFn = {
  createWeiboLink: function(state){
    var url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + globalConfig.wbAppKey +
      "&scope=all" +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri_wb;
    return url;
  },

  createFacebookLink: function(state){
    var url = "https://www.facebook.com/v2.8/dialog/oauth?" +
      "client_id=" + globalConfig.fbAppKey +
      "&response_type=code" +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri_fb;
    return url;
  },


  getOauthQsObj: function(oauthName, qs){
    let result = {
      client_id: globalConfig[oauthName + 'AppKey'],
      client_secret: globalConfig[oauthName + 'AppSecret'],
      code: qs.code,
    };

    switch (oauthName){
      case 'wb':
        _.merge(result, {
          grant_type: 'authorization_code',
          redirect_uri: redirect_uri_wb
        });
        break;
      case 'fb':
        _.merge(result, {
          redirect_uri: redirect_uri_fb
        });
        break;
      default :
        console.error('error in generaing the query object for the access_token');
        break;
    }

    return result;
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

      } else {

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
      console.log(req.session.app);

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

      oauthApi[session.app.oauth].showUser({
        qs:qsObj
      }).then(function(data){

        privateFn.convertOauthIntoLocalDB(session.app.oauth, session, data, res)

      }, function(data){
        res.json({
          isAuth: false
        });
      });

    }
  },

  oauthLogin: function(req, res, next){

    var qs = req.query,
      oauthName = req.params.oauth;

    if(qs.code &&
      qs.state &&
      req.session.app &&
      qs.state === req.session.app.oauthState){

      console.log(`redirected by ${oauthName} auth...`);

      var qsObj = privateFn.getOauthQsObj(oauthName, qs);

      oauthApi[oauthName].accessToken({
        qs: qsObj
      }).then(function(data){

        if(data.access_token){
          req.session.app = {
            oauth: oauthName,
            isAuth: true,
            tokenInfo: data
          };
          res.redirect("/");
        }else{
          res.redirect("/auth");
        }
      });
    }else{
      console.log('redirect fail:');
      console.log(qs);
      console.log(req.session.app);
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