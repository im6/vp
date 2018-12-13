"use strict";
const app = require('./server/app'),
  globalConfig = require('./server/config/env'),
  ip = globalConfig.serverIp,
  port = globalConfig.serverPort,
  server = app.listen(port, ip, () => {
    console.log(`${globalConfig.isDev ? 'dev' : 'production'} is running: ${ip}:${port}`);
  });

server.timeout = 1000 * 60;