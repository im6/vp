import { escape } from 'mysql';
import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import LikeColorInput from '../type/LikeColorInputType';
import MutationOutput from '../type/MutationOutputType';
import { sqlExecOne } from '../../resource/mysqlConnection';

const likeColor = {
  type: MutationOutput,
  args: {
    input: { type: new GraphQLNonNull(LikeColorInput) },
  },
  resolve(obj, args, context, info) {
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
  }
};

export default likeColor;