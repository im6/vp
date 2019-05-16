import app from './app';
import {
  serverIp,
  serverPort,
  isDev,
} from './config';
const server = app.listen(serverPort, serverIp, () => {
  console.log(`${isDev ? 'dev' : 'prod'} is running: http://${serverIp}:${serverPort}`);
});
server.timeout = 1000 * 60;
