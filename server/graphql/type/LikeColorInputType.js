import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const LikeColorInputType = new GraphQLInputObjectType({
  name: 'LikeColorInputType',
  description: 'toggle color like input object',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    willLike: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export default LikeColorInputType;