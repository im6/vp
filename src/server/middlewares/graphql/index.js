import graphqlHTTP from 'express-graphql';
import rootValue from './root';
import schema from './schema';

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: process.env.NODE_ENV === 'development',
  pretty: process.env.NODE_ENV === 'development',
});
