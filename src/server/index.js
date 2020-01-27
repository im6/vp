/* eslint no-console: 0 */
import 'regenerator-runtime/runtime';
import app from './app';
import { SERVER_PORT } from './config';

const port = SERVER_PORT || 3000;

const server = app.listen(port, () =>
  console.log(
    `app (mode: ${process.env.NODE_ENV}) is running on: http://localhost:${port}`
  )
);
server.timeout = 1000 * 5;
