const app = require('./app');
const globalConfig = require('./config/env');

const ip = globalConfig.serverIp;
const port = globalConfig.serverPort;
const server = app.listen(port, ip, () => {
  console.log(`${globalConfig.isDev ? 'dev' : 'production'} is running: http://${ip}:${port}`);
});

server.timeout = 1000 * 60;
