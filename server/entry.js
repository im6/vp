import app from './app';
import {
  serverIp,
  serverPort,
} from './config';
const server = app.listen(serverPort, serverIp, () => {
  console.log(`${process.env.NODE_ENV} is running: http://${serverIp}:${serverPort}`);
});
server.timeout = 1000 * 60;
