import { createClient } from 'redis';
import session from 'express-session';
import { RedisStore } from 'connect-redis';

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

const client = createClient({
  url: `redis://:${password}@${host}:${port}`,
});

client.on('error', (error) => {
  console.error(error); // eslint-disable-line no-console
  process.exit(1);
});

client.on('reconnecting', (_, attmpt) => {
  console.log(`reconnecting, attempt: ${attmpt}`); // eslint-disable-line no-console
});

client.on('connect', () => {
  console.log('Redis connect successfully.'); // eslint-disable-line no-console
});

client.connect();

export default session({
  store: new RedisStore({ client }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
