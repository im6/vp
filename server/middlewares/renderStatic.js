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

module.exports = {
  main: function(req, res, next){
    var subUrl = req.url.split('/');

    if(subUrl[1] === 'bundle.js'){
      res.sendFile(path.resolve(__dirname,`../../dist/bundle.js`));
    } else if(FRONTURLs.indexOf(subUrl[1]) < 0){
      res.redirect('/');
    }else{
      if(globalConfig.isDev){
        console.log(`${req.method}: ${req.originalUrl}`);
      }else{
        res.cookie('_csrf',req.csrfToken());
      }
      res.sendFile(path.resolve(__dirname,`../../dist/index.html`));
    }
  }
};