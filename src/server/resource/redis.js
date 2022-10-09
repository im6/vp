import { createClient } from 'redis';

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
  legacyMode: true,
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

async function init() {
  await client.connect();
}

init();

export default client;
