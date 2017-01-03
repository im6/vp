var globalConfig = require('../config/env'),
  path = require('path');

module.exports = {
  main: function(req, res, next){
    if(globalConfig.isDev){
      console.log(`${req.method}: ${req.originalUrl}`);
    }
    res.sendFile(path.resolve(__dirname,`../../${globalConfig.publicDir}/index.html`) );
  }
};