const app = require('./server/app');
const globalConfig = require('./server/config/env');

const ip = globalConfig.serverIp;
const port = globalConfig.serverPort;
const server = app.listen(port, ip, () => {
  console.log(`${globalConfig.isDev ? 'dev' : 'production'} is running: ${ip}:${port}`);
});

server.timeout = 1000 * 60;
