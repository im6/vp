import graphqlHTTP from 'express-graphql';
import rootValue from './root.js';
import schema from './schema.js';
import { _DEV_ } from '../../config';

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: _DEV_,
  pretty: _DEV_,
});
