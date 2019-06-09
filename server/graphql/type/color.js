import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const ColorType = new GraphQLObjectType({
  name: 'Color',
  description: 'ColorPK Color Model',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    like: { type: new GraphQLNonNull(GraphQLInt) },
    color: { type: new GraphQLNonNull(GraphQLString) },
    userid: { type: GraphQLInt },
    username: { type: GraphQLString },
    display: { type: GraphQLBoolean },
    createdate: { type: GraphQLString },
  },
});

export default ColorType;