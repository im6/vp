const app = require('./app');
const globalConfig = require('./config/env');

const { serverIp, serverPort } = globalConfig;
const server = app.listen(serverPort, serverIp, () => {
  console.log(`${process.env.NODE_ENV} is running: http://${serverIp}:${serverPort}`);
});

server.timeout = 1000 * 60;
