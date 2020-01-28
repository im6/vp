/* eslint no-console: 0 */
import 'regenerator-runtime/runtime';
import app from './app';
import { SERVER_PORT, SERVER_DOMAIN } from './config';

const server = app.listen(SERVER_PORT, () =>
  console.log(
    `app (mode: ${process.env.NODE_ENV}) is running on: http://${SERVER_DOMAIN}:${SERVER_PORT}`
  )
);
server.timeout = 1000 * 5;
