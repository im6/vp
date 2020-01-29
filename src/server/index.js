/* eslint no-console: 0 */
import { exec } from 'child_process';
import 'regenerator-runtime/runtime';
import app from './app';
import { PORT } from './config';

const port = PORT || 8080;

const server = app.listen(port, () =>
  console.log(
    `app (mode: ${process.env.NODE_ENV}) is running on: http://localhost:${port}`
  )
);
server.timeout = 1000 * 5;

exec('curl ifconfig.me', (err, stdout, stderr) => {
  if (err) {
    console.error(stderr);
    return;
  }
  console.log(`public IP addr: ${stdout}`);
});
