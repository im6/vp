import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import color from '../query/color';
import user from '../query/user';
import likeColor from '../mutation/likeColor';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      color,
      user,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      likeColor,
    },
  }),
});

export default schema;