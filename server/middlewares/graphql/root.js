import uuid from 'uuid';
import { escape } from 'mysql';
import { GraphQLError } from 'graphql';
import get from 'lodash.get';

import { createFacebookLink } from './util';
import { sqlExecOne } from '../../resource/mysqlConnection';
import {
  showUser,
} from '../../resource/oauth';

/*
req.session.app = {
  oauth
  isAuth
  tokenInfo
  dbInfo {
    id
    name
    isAdmin
  }
}
*/

const root = {
  async auth (_, req) {
    const isAuth = get(req, 'session.app.isAuth', false);
    const token = get(req, 'session.app.tokenInfo.access_token', null)
    if(isAuth && token) {
      const qsObj = {
        access_token: token,
        fields: 'id,name,picture',
      };
      
      try {
        const { data: oauthData } = await showUser(qsObj);
        const { name, id } = oauthData;
        const qr0 = `SELECT * FROM colorpk_user WHERE oauth = 'fb' AND oauthid = ${escape(id)}`;
        const userData = await sqlExecOne(qr0);
        if(userData.length === 1){
          const { isadmin, id } = userData[0];
          req.session.app.dbInfo = {
            id,
            name,
            isAdmin: isadmin || false
          };
          const qr1 = `SELECT color_id FROM colorpk_userlike WHERE user_id= ${escape(id)}`;
          const likeData = await sqlExecOne(qr1);
          return {
            user: {
              id,
              name,
              isadmin,
              img: get(oauthData, 'picture.data.url', null),
              likes: likeData.map(v => v.color_id),
            },
          };
        } else {
          // first time login, save it.
          const qr = `INSERT INTO colorpk_user (oauth, name, oauthid, lastlogin) VALUES ('fb', '${name}', '${id}', NOW())`;
          const { insertId: id } = sqlExecOne(qr);
          req.session.app.dbInfo = {
            id,
            name,
            isAdmin: false
          };
          return {
            user: {
              id,
              name,
              isadmin: false,
              img: get(oauthData, 'picture.data.url', null),
              likes: [],
            },
          };
        }
      } catch(err) {
        return new GraphQLError(err);
      }
    } else {
      const oauthState = uuid.v1();
      const result = {
        user: null,
        url: createFacebookLink(oauthState),
      };
      if(get(req, 'session.app.authError', null)){
        result.authError = req.session.app.authError;
      }
      req.session.app = {
        oauthState,
      };
      return result;
    }
  },
  async user ({ oauth, oauthid }, req) {
    const qr = `SELECT * FROM colorpk_user WHERE oauth = '${oauth}' AND oauthid = ${escape(oauthid)}`;
    return sqlExecOne(qr).then((data) => {
      if(data.length > 0){
        const {
          id,
          name,
          isadmin
        } = data[0]
        return {
          id, name, isadmin,
        };
      } else {
        return null;
      }
    });
  },
  async color (args, req) {
    const { category } = args;
    const userId = get(req, 'session.app.dbInfo.id');
    if (!userId && (['LIKES', 'PROFILE'].indexOf(category) > -1)) {
      return new GraphQLError('no user defined');
    }
    const uid = escape(userId);
    let qr = null;

    switch(category) {
      case 'PUBLIC':
        qr = 'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY \`id\` DESC';
        break;
      case 'LIKES':
        qr = `SELECT a.* FROM colorpk_color a
          INNER JOIN 
          (SELECT color_id FROM colorpk_userlike WHERE user_id = ${uid}) b
          ON id = b.color_id`;
        break;
      case 'PROFILE':
        qr = `SELECT a.*, false as \`liked\` FROM colorpk_color a WHERE userid = ${uid} `;
        break;
      case 'ANONYMOUS':
          qr = 'SELECT * FROM colorpk_color a WHERE a.display = 1';
        break;
      default:
        qr = 'SELECT a.* FROM colorpk_color a WHERE a.display=0';
        break;
    }
    try {
      const colors = await sqlExecOne(qr)
      return colors.map(v => {
        return {
          id: v.id,
          like: v.like,
          color: v.color,
          userid: v.userid,
          username: v.username,
          createdate: v.createdate,
        };
      });
    } catch(err) {
      return new GraphQLError(err);
    }
  },

  async likeColor(args, req) {
    const { id, willLike } = args.input;
    const qr = `UPDATE colorpk_color SET \`like\` = \`like\` ${willLike ? '+' : '-'}  1 WHERE id = ${escape(id)}`;
    try {
      const resData = await sqlExecOne(qr)
      return colors.map(v => {
        return {
          error: resData.affectedRows !== 1,
          data: null,
        };
      });
    } catch(err) {
      return new GraphQLError(err);
    }
  },

  async createColor(args, req) {
    const { color } = args.input;
    const hasAuth = get(req, 'session.app.isAuth', false);
    const sessionUsername = get(req, 'session.app.dbInfo.name', null);
    const sessionUserid = get(req, 'session.app.dbInfo.id', null)
    const username = (hasAuth && sessionUsername)? `'${sessionUsername}'` : 'NULL';
    const userid = (hasAuth && sessionUserid)? `${sessionUserid}` : 'NULL';
    const displayItem = userid == 'NULL' ? 1 : 0;
    const random = (Math.random() * 10).toFixed();

    if(color.length === 27) {
      const qr = `INSERT INTO colorpk_color (\`like\`, color, userid, username, colortype, display, createdate) VALUES (${random}, '${color}', ${userid}, ${username}, NULL, ${displayItem}, NOW())`;
      try {
        const row = await sqlExecOne(qr)
        return {
          error: false,
          data: row.insertId,
        }
      } catch(err) {
        return new GraphQLError(err);
      }
    } else {
      return new GraphQLError('invalid color input');
    }
  },

  async adjudicateColor(args, req) {
    const isAdmin = get(req, 'session.app.dbInfo.isAdmin');
    if(!isAdmin){
      return new GraphQLError('adjudicate error: no admin access');
    }
    const { id, willLike } = args.input;
    const qr = willLike ? 
      `UPDATE colorpk_color SET \`display\` = 0 WHERE id = ${escape(id)}`:
      `DELETE FROM colorpk_color WHERE id = '${id}'`;
      
    return sqlExecOne(qr).then((resData) => {
      return {
        error: resData.affectedRows !== 1,
        data: null,
      };
    }, (err) => {
      return new GraphQLError(err);
    });
  },

  logoff(_, req) {
    const username = get(req, 'session.app.dbInfo.name', '(unknow)')
    console.log(`logoff ${username}, delete session`);
    delete req.session.app;

    const oauthState = uuid.v1();
    req.session.app = {
      oauthState,
    };
    return {
      url: createFacebookLink(oauthState)
    };
  }
};

export default root;
