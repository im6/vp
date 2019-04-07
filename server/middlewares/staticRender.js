var globalConfig = require('../config/env'),
  path = require('path');

var FRONTURLs = [
  '',
  'auth',
  'portfolio',
  'latest',
  'like',
  'about',
  'color',
  'new',
  'extract',
  'resourceapi',
  'about',
  'adminpanel',
];
const appRoot = process.env.PWD;

module.exports = {
  staticFile: function(req, res, next){
    var subUrl = req.url.split('/');
    if(subUrl[1] === 'bundle.js'){
      res.sendFile(path.resolve(appRoot,`./dist/public/bundle.js`));
    } else {
      next();
    }
  },
  h5Route: function(req, res, next){
    var subUrl = req.url.split('/');
    if(FRONTURLs.indexOf(subUrl[1]) > -1){
      if(globalConfig.isDev){
        console.log(`${req.method}: ${req.originalUrl}`);
      } else {
        res.cookie('_csrf',req.csrfToken());
      }
      const indexPath = path.join(appRoot, './dist/public/index.html');
      res.sendFile(indexPath);
    } else {
      next();
    }
  }
};