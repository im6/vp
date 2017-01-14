"use strict";
let app = require('./server/bin/app'),
  globalConfig = require('./server/config/env'),
  ip = globalConfig.serverIp,
  port = globalConfig.serverPort;

app.listen(port, ip, function () {
    console.log(`app is running on ${ip}:${port}`);
});