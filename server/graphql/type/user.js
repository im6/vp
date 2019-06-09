import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'ColorPK User Model',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    oauth: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    oauthid: { type: new GraphQLNonNull(GraphQLString) },
    isadmin: { type: GraphQLBoolean },
    lastlogin: { type: GraphQLString },
  },
});

export default UserType;
