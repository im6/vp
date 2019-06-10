import graphqlHTTP from 'express-graphql';
import root from './root.js';
import schema from './schema.js'; 
import { isDev } from '../../config';

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: isDev,
  pretty: isDev,
});
