import graphqlHTTP from 'express-graphql';
import rootValue from './root.js';
import schema from './schema.js';
import { isDev } from '../../config';

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: isDev,
  pretty: isDev,
});
