var weiboApi = require('../resource/weibo/list'),
  globalConfig = require('../config/env'),
  url = require('url'),
  path = require('path');

module.exports = {
  main: function(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    res.sendFile(path.resolve(__dirname,`../../${globalConfig.publicDir}/index.html`) );
  }
};