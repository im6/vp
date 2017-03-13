"use strict";
var app = require('./server/bin/app'),
  globalConfig = require('./server/config/env'),
  ip = globalConfig.serverIp,
  port = globalConfig.serverPort;

var server = app.listen(port, ip, function () {
    console.log(`app is running on ${ip}:${port}`);
});

server.timeout = 1000 * 60;