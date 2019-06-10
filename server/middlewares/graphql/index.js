import graphqlHTTP from 'express-graphql';
import root from './root.js';
import schema from './schema.js'; 
import { isDev } from '../../config';
import { sqlExecOne } from '../../resource/mysqlConnection';

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: isDev,
  pretty: isDev,
  context: {
    sqlExecOne,
  }
});
