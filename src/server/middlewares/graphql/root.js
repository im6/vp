import get from 'lodash.get';
import { GraphQLError } from 'graphql';

import sqlExecOne from '../../resource/mysqlConnection';
import { showUser } from '../../resource/oauth';
import { isAuth, isAdmin, getToken } from '../../helper';
import { isValidColorStr } from '../../../util';

const root = {
  async user(_, req) {
    const accessToken = getToken(req);
    if (isAuth(req, true) && accessToken) {
      // has valid auth info, will verify from oauth
      const qsObj = {
        access_token: accessToken,
        fields: 'id,name,picture',
      };

      try {
        const { data: oauthData } = await showUser(qsObj);
        const { name, id: oauthId } = oauthData;
        const userData = await sqlExecOne(
          `SELECT * FROM colorpk_user WHERE oauth = 'fb' AND oauth_id = ?`,
          [oauthId]
        );
        if (userData.length === 1) {
          // existing user.
          const { is_admin: isAdminInt, id: userId } = userData[0];

          req.session.app.dbInfo = {
            id: userId,
            name, // grab name from oauth
            isAdmin: isAdminInt || false,
          };

          const likeData = await sqlExecOne(
            'SELECT color_id FROM colorpk_userlike WHERE user_id= ?',
            [userId]
          );

          const ownData = await sqlExecOne(
            'SELECT a.id FROM colorpk_color a WHERE a.user_id=?',
            [userId]
          );

          sqlExecOne('UPDATE colorpk_user SET last_login=NOW() WHERE id=?', [
            userId,
          ]);

          return {
            name,
            isAdmin: isAdminInt || false,
            img: get(oauthData, 'picture.data.url', null),
            likes: likeData.map((v) => v.color_id),
            owns: ownData.map((v) => v.id),
          };
        }

        // user first time login, save it.
        const {
          insertId,
        } = await sqlExecOne(
          `INSERT INTO colorpk_user (oauth, name, oauth_id, last_login) VALUES ('fb', ?, ?, NOW())`,
          [name, oauthId]
        );
        req.session.app.dbInfo = {
          id: insertId,
          name,
          isAdmin: false,
        };
        return {
          name,
          isAdmin: false,
          img: get(oauthData, 'picture.data.url', null),
          likes: [],
          owns: [],
        };
      } catch (err) {
        return new GraphQLError(err.toString());
      }
    } else {
      return null;
    }
  },

  async color({ category }, req) {
    if (!isAdmin(req) && category === 'ANONYMOUS') {
      return new GraphQLError('color error: no admin access');
    }

    let colors = null;

    switch (category) {
      case 'PUBLIC':
        colors = await sqlExecOne(
          'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY `id` DESC'
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
      return colors.map((v) => ({
        id: v.id,
        star: v.star,
        color: v.color,
        userId: v.user_id,
        username: v.username,
        createdDate: v.created_date,
      }));
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async likeColor({ input }, req) {
    const { id, willLike } = input;
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

      if (willLike) {
        const resData = await sqlExecOne(
          `UPDATE colorpk_color SET \`star\` = \`star\` + 1 WHERE id = ?`,
          [id]
        );
        return {
          status: resData.affectedRows === 1 ? 0 : 1,
        };
      }
      return {
        status: 0,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async createColor({ input }, req) {
    const { color } = input;
    if (!isValidColorStr(`#${color}`)) {
      return new GraphQLError('create error: invalid color input');
    }

    const sessionUsername = get(req, 'session.app.dbInfo.name', null);
    const sessionUserid = get(req, 'session.app.dbInfo.id', null);
    const hasUserSignIn = isAuth(req) && sessionUsername;
    const username = hasUserSignIn ? sessionUsername : null;
    const userId = hasUserSignIn ? sessionUserid : null;
    const random = (Math.random() * 20).toFixed();

    try {
      const row = await sqlExecOne(
        'INSERT INTO colorpk_color (`star`, color, user_id, username, color_type, display, created_date) VALUES (?, ?, ?, ?, NULL, ?, NOW())',
        [random, color, userId, username, hasUserSignIn ? 0 : 1]
      );
      return {
        status: 0,
        data: row.insertId,
      };
    } catch (err) {
      return new GraphQLError(err.toString());
    }
  },

  async adjudicateColor({ input }, req) {
    if (!isAdmin(req)) {
      return new GraphQLError('adjudicate error: no admin access');
    }
    const { id, willLike } = input;
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
};

export default root;
