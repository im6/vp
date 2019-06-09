import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import color from '../query/color';
import user from '../query/user';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      color,
      user,
    },
  })
});

export default schema;