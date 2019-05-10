
import { escape } from 'mysql';
import uuid from 'uuid';
import { sqlExecOne } from '../../resource/db/mysqlConnection';
import {
  resSuccessObj,
  resFailObj,
} from '../../misc/helper';
import {
  redirect_uri_fb,
  fbAppSecret,
  fbAppKey,
} from '../../config';
import {
  showUser,
  accessToken
} from '../../resource/oauth/list';

const privateFn = {
  createFacebookLink: (state) => {
    const url = "https://www.facebook.com/v2.8/dialog/oauth?" +
      "client_id=" + fbAppKey +
      "&response_type=code" +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri_fb;
    return url;
  },

  getOauthQsObj: (oauthName, qs) => {
    const result = {
      client_id: fbAppKey,
      client_secret: fbAppSecret,
      code: qs.code,
      redirect_uri: redirect_uri_fb
    };
    return result;
  },

  checkUserInfo: (oauth, uid) => {
    const qr = `SELECT * FROM colorpk_user WHERE oauth = '${oauth}' AND oauthid = ${uid}`;
    return sqlExecOne(qr);
  },
  createNewUser: (oauth, name, id) => {
    const qr = `INSERT INTO colorpk_user (oauth, name, oauthid, lastlogin) VALUES ('${oauth}', '${name}', '${id}', NOW())`;
    return sqlExecOne(qr);
  },
  addUserLike: (userid, colorid) => {
    const qr = `INSERT INTO colorpk_userlike (user_id, color_id) VALUES ('${userid}', '${escape(colorid)}')`;
    return sqlExecOne(qr);
  },
  removeUserLike: (userid, colorid) => {
    const qr = `DELETE FROM colorpk_userlike WHERE user_id= '${userid}' AND color_id = '${escape(colorid)}'`;
    return sqlExecOne(qr);
  },
  getUserLike: (userid) => {
    const qr = `SELECT color_id FROM colorpk_userlike WHERE user_id= '${userid}'`;
    return sqlExecOne(qr);
  },
  updateUserLoginDate: (userid) => {
    const qr = `UPDATE colorpk_user SET lastlogin=NOW() WHERE id=${userid}`;
    return sqlExecOne(qr);
  },

  convertOauthIntoLocalDB: (oauthType, session, data, res) => {
    var like = [];

    var imgUrl = null,
      genericName = null;

    switch (oauthType){
      case 'wb':
        imgUrl = data.profile_image_url;
        genericName = data.name;
        break;
      case 'fb':
        imgUrl = data.picture.data.url;
        genericName = data.name;
        break;
      case 'gg':
        imgUrl = data.image.url;
        genericName = data.displayName;
        break;
      default:
        break;
    }

    privateFn.checkUserInfo(oauthType, data.id).then((row1) => {
      if(row1.length < 1){
        privateFn.createNewUser(oauthType, genericName, data.id).then((row2) => {

          session.app.dbInfo = {
            id: row2.insertId,
            name: genericName,
            isAdmin: false
          };

          res.json({
            isAuth: true,
            like: like,
            profile: {
              id: data.id,
              name: genericName,
              img: imgUrl,
              isAdmin: false
            }
          });
        }, () => {
          console.error('create user error');
        });

      } else {

        session.app.dbInfo = {
          id: row1[0].id,
          name: genericName,
          isAdmin: row1[0].isadmin || false
        };

        privateFn.updateUserLoginDate(row1[0].id);
        privateFn.getUserLike(row1[0].id).then((row2) => {
          like = row2.map((v) => {
            return v.color_id;
          });

          res.json({
            isAuth: true,
            like: like,
            profile: {
              id: row1[0].id,
              name: genericName,
              img: imgUrl,
              isAdmin: session.app.dbInfo.isAdmin
            }
          });
        });
      }
    });
  }
};

export const getInitAuth = (req, res, next) => {
  const { session } = req;
  if(!session.app || !session.app.isAuth){
    var stateId = uuid.v1();
    let result = {
      isAuth: false,
      facebookUrl: privateFn.createFacebookLink(stateId),
    };

    if(req.session.app && req.session.app.alert){
      result['alert'] = req.session.app.alert;
    }

    req.session.app = {
      isAuth: false,
      oauthState : stateId
    };

    res.json(result);
  }
  else {
    res.json({
      isAuth: true
    });
  }
}

export const getUserInfo = (req, res, next) => {
  const { session } = req;
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

    var qsObj = {
      access_token: session.app.tokenInfo.access_token,
      fields: 'id,name,picture'
    };

    if(!qsObj){
      console.error('session set error on authed users.');
      return;
    }

    showUser(qsObj).then((data) => {
      privateFn.convertOauthIntoLocalDB(session.app.oauth, session, data.data, res);
    }, () => {
      res.json({
        isAuth: false,
      });
    });
  }
}

export const oauthLogin = (req, res, next) => {
  const qs = req.query,
    oauthName = req.params.oauth;
  if(qs.code &&
    qs.state &&
    req.session.app &&
    qs.state === req.session.app.oauthState){
    console.log(`redirected by ${oauthName} auth...`);
    const qsObj = privateFn.getOauthQsObj(oauthName, qs);
    accessToken(qsObj).then((data) => {
      data = data.data;
      if(data.access_token){
        req.session.app = {
          oauth: oauthName,
          isAuth: true,
          tokenInfo: data
        };
      }
      res.redirect("/");
    });
  } else {
    console.log('inconsistant session, error msg in session');
    req.session.app = {
      isAuth: false,
      alert: {
        type: 0,
        detail: 'Sorry, something error, please try again.'
      }
    };
    res.redirect("/");
  }
}

export const logoff = (req, res, next) => {
  console.log('logoff and delete session');
  delete req.session.app;
  res.json({
    error: false
  })
}

export const initColorList = (req, res, next) => {
  const qr = 'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY \`id\` DESC';
  sqlExecOne(qr).then((data) => {
    res.json(resSuccessObj(data));
  }, (data) => {
    res.json(resFailObj(data));
  });
}

export const initColorPortfolio = (req, res, next) => {
  const qr = `SELECT a.*, false as \`liked\` FROM colorpk_color a WHERE userid = '${req.session.app.dbInfo.id}' `;
  sqlExecOne(qr).then((data) => {
    res.json(resSuccessObj(data));
  }, (data) => {
    res.json(resFailObj(data));
  });
}

export const initColorLike = (req, res, next) => {
  const qr1 = `SELECT a.color_id FROM colorpk_userlike a WHERE a.user_id = '${req.session.app.dbInfo.id}' `;
  sqlExecOne(qr1).then((data) => {
    if(data.length < 1){
      res.json(resSuccessObj([]));
    }else{
      let idList = data.map((v, k) => {
        return v.color_id;
      });

      var qr2 = `SELECT a.*, false as \`liked\` FROM colorpk_color a WHERE a.id IN (${idList.join(',')}) `;
      sqlExecOne(qr2).then((data2) => {
        res.json(resSuccessObj(data2));
      }, (data2) => {
        res.json(resFailObj(data2));
      });
    }

  }, (data0) => {
    res.json(resFailObj(data0));
  });
}

export const getColorType = (req, res, next) => {
  const qr = 'SELECT a.id AS `key`, a.name AS `value` FROM colorpk_colortype a';
  sqlExecOne(qr).then((data) => {
    res.json(resSuccessObj(data));
  }, (data) => {
    res.json(resFailObj(data));
  });
}

export const toggleLike = (req, res, next) => {
  const qr = `UPDATE colorpk_color SET \`like\` = \`like\` ${req.body.willLike ? '+' : '-'}  1 WHERE id = ${req.body.id}`;
  sqlExecOne(qr).then(() => {
    res.json(resSuccessObj(1));
  }, () => {
    res.json(resFailObj(0));
  });

  if(req.session.app && req.session.app.isAuth){
    if(req.body.willLike){
      privateFn.addUserLike(req.session.app.dbInfo.id, req.body.id);
    } else {
      privateFn.removeUserLike(req.session.app.dbInfo.id, req.body.id);
    }
  }
}

export const addNewColor = (req, res, next) => {
  const hasAuth = req.session.app && req.session.app.isAuth;
  const username = (hasAuth && req.session.app.dbInfo.name)? `'${req.session.app.dbInfo.name}'` : 'NULL';
  const userid = (hasAuth && req.session.app.dbInfo.id)? `${req.session.app.dbInfo.id}` : 'NULL';
  const displayItem = userid == 'NULL' ? 1 : 0;
  const random = (Math.random() * 10).toFixed();

  if(req.body.color.length === 27) {
    const qr = `INSERT INTO colorpk_color (\`like\`, color, userid, username, colortype, display, createdate) VALUES (${random}, '${req.body.color}', ${userid}, ${username}, '${req.body.colorType}', ${displayItem}, NOW())`;
    sqlExecOne(qr).then((row) => {
      res.json(resSuccessObj({
        id:row.insertId,
        name: hasAuth ? req.session.app.dbInfo.name : null
      }));
    }, (err) => {
      res.json(resFailObj(err));
    });
  } else {
    res.json(resFailObj("invalid json"));
  }
}