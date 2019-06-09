import { GraphQLList as List } from 'graphql';
import ColorType from '../type/color';
import { sqlExecOne } from '../../resource/mysqlConnection';

const color = {
  type: new List(ColorType),
  resolve() {
    const qr = 'SELECT a.* FROM colorpk_color a WHERE a.display=0 ORDER BY \`id\` DESC';
    return sqlExecOne(qr).then((data) => {
      return data.map(v => {
        const {
          id,
          like,
          color,
          userid,
          username,
          display,createdate
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
  }
};

export default color;