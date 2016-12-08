'use strict';
var path = require('path'),
    appDir = path.dirname(require.main.filename),
  globalConfig = require('../../../env/config');

module.exports = {
    main: function(req, res, next){
      if(globalConfig.isDev){
        res.sendFile('/public/main/index.html',{ root: appDir });
      }else{
        res.render('index',{

        });
      }

    },
    logout: function(req, res, next){
        delete req.session.app;
        res.redirect('/login');
    }
};

