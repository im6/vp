"use strict";
let app = require('./server/bin/app'),
  globalConfig = require('./server/config/env'),
  port = globalConfig.serverPort;

app.listen(port, function () {
    console.log('app is running on port: '+ port);
});