/* eslint no-console: 0 */
import 'regenerator-runtime/runtime';
import app from './app/index';
import { SERVER_IP, SERVER_PORT, NODE_ENV } from './config';

const server = app.listen(SERVER_PORT, SERVER_IP, () => {
  console.log(
    `app(mode: ${NODE_ENV}) is running: http://${SERVER_IP}:${SERVER_PORT}`
  );
});
server.timeout = 1000 * 5;
