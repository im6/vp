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
  console.error('missing redis connection info');
  process.exit(1);
}

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host,
  port,
  password,
});

redisClient.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

redisClient.on('reconnecting', (_, attmpt) => {
  console.log(`reconnecting, attempt: ${attmpt}`);
});

redisClient.on('connect', () => {
  console.log('Redis connect successfully.');
});

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
