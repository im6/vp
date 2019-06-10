import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const MutationOutputType = new GraphQLObjectType({
  name: 'MutationOutput',
  description: 'action result object',
  fields: {
    error: { type: new GraphQLNonNull(GraphQLBoolean) },
    data: { type: GraphQLString }
  },
});

export default MutationOutputType;