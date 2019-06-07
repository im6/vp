import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const Color = new GraphQLObjectType({
  name: 'Color',
  description: 'ColorPK Color Database',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    like: { type: new GraphQLNonNull(GraphQLInt) },
    color: { type: new GraphQLNonNull(GraphQLString) },
    userid: { type: GraphQLInt },
    username: { type: GraphQLString },
    colortype: { type: GraphQLString },
    display: { type: GraphQLBoolean },
    createdate: { type: GraphQLString },
  },
});

export default Color;