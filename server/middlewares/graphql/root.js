import { escape } from 'mysql';

const root = {
  user: ({ oauth, oauthid }, { sqlExecOne }) => {
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
  color: (args, { sqlExecOne }) => {
    const qr = 'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY \`id\` DESC';
    return sqlExecOne(qr).then((data) => {
      return data.map(v => {
        const {
          id,
          like,
          color,
          userid,
          username,
          display,
          createdate,
        } = v;
        return {
          id,
          like,
          color,
          userid,
          username,
          display,
          createdate,
        }
      });
    });
  },

  likeColor(args, { sqlExecOne }) {
    const { id, willLike } = args.input;
    const qr = `UPDATE colorpk_color SET \`like\` = \`like\` ${willLike ? '+' : '-'}  1 WHERE id = ${escape(id)}`;
    return sqlExecOne(qr).then((resData) => {
      return {
        error: resData.affectedRows !== 1,
        data: null,
      };
    }, () => {
      return {
        error: true,
        data: null,
      };
    });
  },
};

export default root;