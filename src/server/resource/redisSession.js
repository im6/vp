import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { SESSION_SECRET } from '../constant.server';

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
} = process.env;

if (!host || !port || !password) {
  console.error('missing redis connection info'); // eslint-disable-line no-console
  process.exit(1);
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host,
  port,
  password,
});

redisClient.on('error', (error) => {
  console.error(error); // eslint-disable-line no-console
  process.exit(1);
});

redisClient.on('reconnecting', (_, attmpt) => {
  console.log(`reconnecting, attempt: ${attmpt}`); // eslint-disable-line no-console
});

redisClient.on('connect', () => {
  console.log('Redis connect successfully.'); // eslint-disable-line no-console
});

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
