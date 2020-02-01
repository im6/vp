import uuid from 'uuid';
import get from 'lodash.get';
import { GraphQLError } from 'graphql';

import sqlExecOne from '../../resource/mysqlConnection';
import { showUser, createFacebookLink } from '../../resource/oauth';
import { isAuth, isAdmin, getToken } from '../../helper';

const root = {
  async auth(_, req) {
    const accessToken = getToken(req);
    if (isAuth(req, true) && accessToken) {
      // has valid auth info, will verify from oauth
      const qsObj = {
        access_token: accessToken,
        fields: 'id,name,picture',
      };

      try {
        const { data: oauthData } = await showUser(qsObj);
        const { name, id } = oauthData;
        const userData = await sqlExecOne(
          `SELECT * FROM colorpk_user WHERE oauth = 'fb' AND oauthid = ?`,
          [id]
        );
        if (userData.length === 1) {
          // existing user.
          const { isadmin, id: userId } = userData[0];
          req.session.app.dbInfo = {
            id: userId,
            name, // grab name from oauth
            isAdmin: isadmin || false,
          };

          const likeData = await sqlExecOne(
            'SELECT color_id FROM colorpk_userlike WHERE user_id= ?',
            [userId]
          );

          const ownData = await sqlExecOne(
            'SELECT a.id FROM colorpk_color a WHERE a.userid=?',
            [userId]
          );

          sqlExecOne('UPDATE colorpk_user SET lastlogin=NOW() WHERE id=?', [
            userId,
          ]);

          return {
            __typename: 'User',
            id: userId,
            name,
            isadmin,
            img: get(oauthData, 'picture.data.url', null),
            likes: likeData.map(v => v.color_id),
            owns: ownData.map(v => v.id),
          };
        }

        // user first time login, save it.
        const {
          insertId,
        } = await sqlExecOne(
          `INSERT INTO colorpk_user (oauth, name, oauthid, lastlogin) VALUES ('fb', ?, ?, NOW())`,
          [name, id]
        );
        req.session.app.dbInfo = {
          id: insertId,
          name,
          isAdmin: false,
        };
        return {
          __typename: 'User',
          id: insertId,
          name,
          isadmin: false,
          img: get(oauthData, 'picture.data.url', null),
          likes: [],
          owns: [],
        };
      } catch (err) {
        return new GraphQLError(err.toString());
      }
    } else {
      // no valid auth info, response auth state value
      const oauthState = uuid.v1();
      req.session.app = {
        oauthState,
      };
      return {
        __typename: 'AuthFailResponse',
        url: createFacebookLink(oauthState),
        error: get(req, 'session.app.authError', null),
        status: 0,
      };
    }
  },

  async color(args, req) {
    const { category } = args;
    if (!isAuth(req) && ['LIKES', 'PROFILE'].indexOf(category) > -1) {
      return new GraphQLError('color error: no user defined');
    }
    if (!isAdmin(req) && category === 'ANONYMOUS') {
      return new GraphQLError('color error: no admin access');
    }

    const userId = get(req, 'session.app.dbInfo.id', null);
    let colors = null;

    switch (category) {
      case 'PUBLIC':
        colors = await sqlExecOne(
          'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY `id` DESC'
        );
        break;
      case 'LIKES':
        colors = await sqlExecOne(
          `SELECT a.* FROM colorpk_color a
          INNER JOIN 
          (SELECT color_id FROM colorpk_userlike WHERE user_id = ?) b
          ON id = b.color_id`,
          [userId]
        );
        break;
      case 'PROFILE':
        colors = await sqlExecOne(
          'SELECT a.*, false as `liked` FROM colorpk_color a WHERE userid = ?',
          [userId]
        );
        break;
      case 'ANONYMOUS':
        colors = await sqlExecOne(
          'SELECT * FROM colorpk_color a WHERE a.display = 1'
        );
        break;
      default:
        // GraphQL will make sure category match enumeration type
        break;
    }

    try {
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
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async likeColor(args, req) {
    const { id, willLike } = args.input;
    try {
      if (isAuth(req)) {
        const userId = get(req, 'session.app.dbInfo.id', null);
        sqlExecOne(
          willLike
            ? 'INSERT INTO colorpk_userlike (user_id, color_id) VALUES (?, ?)'
            : 'DELETE FROM colorpk_userlike WHERE user_id= ? AND color_id = ?',
          [userId, id]
        );
      }

      const resData = await sqlExecOne(
        `UPDATE colorpk_color SET \`like\` = \`like\` ${
          willLike ? '+' : '-'
        }  1 WHERE id = ?`,
        [id]
      );
      return {
        status: resData.affectedRows === 1 ? 0 : 1,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async createColor(args, req) {
    const { color } = args.input;
    const hasAuth = isAuth(req);

    const sessionUsername = get(req, 'session.app.dbInfo.name', null);
    const sessionUserid = get(req, 'session.app.dbInfo.id', null);
    const hasUserSignIn = hasAuth && sessionUsername;
    const username = hasUserSignIn ? sessionUsername : null;
    const userId = hasUserSignIn ? sessionUserid : null;

    const random = (Math.random() * 10).toFixed();
    if (color.length === 27) {
      try {
        const row = await sqlExecOne(
          'INSERT INTO colorpk_color (`like`, color, userid, username, colortype, display, createdate) VALUES (?, ?, ?, ?, NULL, ?, NOW())',
          [random, color, userId, username, hasUserSignIn ? 0 : 1]
        );
        return {
          status: 0,
          data: row.insertId,
        };
      } catch (err) {
        return new GraphQLError(err.toString());
      }
    } else {
      return new GraphQLError('create error: invalid color input');
    }
  },

  async adjudicateColor(args, req) {
    if (!isAdmin(req)) {
      return new GraphQLError('adjudicate error: no admin access');
    }
    const { id, willLike } = args.input;
    try {
      const resData = await sqlExecOne(
        willLike
          ? 'UPDATE colorpk_color SET `display` = 0 WHERE id = ?'
          : 'DELETE FROM colorpk_color WHERE id = ?',
        [id]
      );
      return {
        status: resData.affectedRows === 1 ? 0 : 1,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  logoff(_, req) {
    const username = get(req, 'session.app.dbInfo.name', '(unknown)');
    console.log(`logoff ${username}, delete session`); // eslint-disable-line no-console
    delete req.session.app;

    const oauthState = uuid.v1();
    req.session.app = {
      oauthState,
    };
    return {
      url: createFacebookLink(oauthState),
    };
  },
};

export default root;
