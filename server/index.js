import "regenerator-runtime/runtime";
import app from './app/index';
import {
  serverIp,
  serverPort,
  isDev,
} from './config';
const server = app.listen(serverPort, serverIp, () => {
  console.log(`${isDev ? 'dev' : 'prod'} is running: http://${serverIp}:${serverPort}`);
});
server.timeout = 1000 * 5;
