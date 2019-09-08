import graphqlHTTP from 'express-graphql';
import rootValue from './root.js';
import schema from './schema.js';

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: process.env.NODE_ENV === 'development',
  pretty: process.env.NODE_ENV === 'development',
});
