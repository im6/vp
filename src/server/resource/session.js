import session from 'express-session';
import connectRedis from 'connect-redis';
import { SESSION_SECRET } from '../constant.server';
import redis from './redis';

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({ client: redis }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
