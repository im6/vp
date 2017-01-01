
'use strict';
var globalConfig = require('../../config/env'),
  mysql = require('../../resource/db/mysqlConnection'),
  weiboApi = require('../../resource/weibo/list'),
  uuid = require('uuid'),
  helper = require('../../misc/helper'),
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
  }
};


module.exports = {
  getInitAuth: function(req, res, next){
    let session = req.session;
    if(!session.app || !session.app.isAuth){
      var stateId = uuid.v1();
      req.session.app = {
        isAuth: false,
        weiboState : stateId
      };

      res.json({
        isAuth: false,
        weiboUrl: privateFn.createWeiboLink(stateId)
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
        weiboState : stateId
      };

      res.json({
        isAuth: false
      });
    }
    else {
      console.log('already signing in...');
      var qsObj = {
        access_token: session.app.tokenInfo.access_token,
        uid: session.app.tokenInfo.uid
      };
      weiboApi.showUser({
        qs:qsObj
      }).then(function(data){

        var like = [];

        privateFn.checkUserInfo('wb', data.id).then(function(row1){
          if(row1.length < 1){
            privateFn.createNewUser('wb', data.name, data.id).then(function(row2){

              session.app.dbInfo = {
                id: row2.insertId,
                username: data.name,
                isAdmin: false
              };

              res.json({
                isAuth: true,
                weiboInfo: data,
                like: like
              });
            }, function(row2error){

            });

          }else{

            session.app.dbInfo = {
              id: row1[0].id,
              username: data.name,
              isAdmin: row1[0].isadmin || false
            };

            privateFn.getUserLike(row1[0].id).then(function(row2){
              like = row2.map(function(v,k){
                return v.colorid;
              });
              res.json({
                isAuth: true,
                weiboInfo: data,
                like: like
              });
            });
          }
        });



      }, function(data){
        res.json({
          isAuth: false
        });
      });
    }
  },

  weibologin: function(req, res, next){
    var qs = req.query; // code and state

    if(qs.code &&
      qs.state &&
      req.session.app &&
      qs.state === req.session.app.weiboState){
      // redirected by weibo
      console.log('redirected by weibo auth...');

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
    var qr = 'select a.id, a.like, a.color AS `value`, a.username, false as `liked` from color a';
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
    let username = (hasAuth && req.session.app.dbInfo.username)? `'${req.session.app.dbInfo.username}'` : 'NULL';
    let userid = (hasAuth && req.session.app.dbInfo.id)? `${req.session.app.dbInfo.id}` : 'NULL';
    let displayItem = userid == 'NULL' ? 1 : 0;
    var qr = `INSERT INTO color (\`like\`, color, userid, username, colortype, display, createdate) VALUES (0, '${req.body.value}', ${userid}, ${username}, '${req.body.colorType}', ${displayItem}, NOW())`;

    mysql.sqlExecOne(qr).then(function(row){
      res.json(helper.resSuccessObj({
        id:row.insertId,
        username: hasAuth ? req.session.app.dbInfo.username : null
      }));
    }, function(err){
      res.json(helper.resFailObj(row.insertId));
    });
  },
};