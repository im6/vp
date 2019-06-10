import UserType from '../type/UserType';
import { sqlExecOne } from '../../resource/mysqlConnection';

import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const query = {
  type: UserType,
  args: {
    oauth: { type: new GraphQLNonNull(GraphQLString) },
    oauthid: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(obj, args, context, info) {;
    const { oauth, oauthid } = args;
    const qr = `SELECT * FROM colorpk_user WHERE oauth = '${oauth}' AND oauthid = ${escape(oauthid)}`;
    return sqlExecOne(qr).then((data) => {
      if(data.length > 0){
        const {
          id,
          name,
          isadmin
        } = data[0]
        return {
          id, name, isadmin
        };
      } else {
        return null;
      }
    });
  },
};

export default query;