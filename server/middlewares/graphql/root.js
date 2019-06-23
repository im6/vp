import { escape } from 'mysql';
import { GraphQLError } from 'graphql';
import get from 'lodash.get';
import { sqlExecOne } from '../../resource/mysqlConnection';

const root = {
  user: ({ oauth, oauthid }, req) => {
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
      return new GraphQLError({
        message: 'no user defined',
      });
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
  },

  likeColor(args, req) {
    const { id, willLike } = args.input;
    const qr = `UPDATE colorpk_color SET \`like\` = \`like\` ${willLike ? '+' : '-'}  1 WHERE id = ${escape(id)}`;
    return sqlExecOne(qr).then((resData) => {
      return {
        error: resData.affectedRows !== 1,
        data: null,
      };
    }, (message) => {
      return new GraphQLError({
        message,
      });
    });
  },

  createColor(args, req) {
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
      return sqlExecOne(qr).then((row) => {
        return {
          error: false,
          data: row.insertId,
        }
      }, (err) => {
        return new GraphQLError({
          message: err,
        });
      });
    } else {
      return new GraphQLError({
        message: 'invalid color input',
      });
    }
  },

  adjudicateColor(args, req) {
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
      return new GraphQLError({
        message: err,
      });
    });
  },
};

export default root;
