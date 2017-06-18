"use strict";
const express = require('express'),
  path = require('path'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  globalConfig = require('../config/env'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  csrf = require('csurf'),
  helmet = require('helmet'),
  MySQLStore = require('express-mysql-session')(expressSession);

console.log(`NODE_ENV: ${globalConfig.isDev ? 'dev' : 'production'}`);

const app = express();

var sessionOpt = {
  secret: globalConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  }
};

if(!globalConfig.isDev){
  sessionOpt.store = new MySQLStore({
    host     : process.env['OPENSHIFT_MYSQL_DB_HOST'],
    port     : process.env['OPENSHIFT_MYSQL_DB_PORT'],
    user     : process.env['SQL_USERNAME'],
    password : process.env['SQL_PASSWORD'],
    database : process.env['SQL_DATABASE'],
    checkExpirationInterval: 4 * 3600 * 1000,
    expiration: 12 * 3600 * 1000,
  });
  console.log('session is now using mysql');
}

app.set('x-powered-by', false);
app.use(helmet());
app.use(express.static(globalConfig.publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession(sessionOpt));

if(globalConfig.isDev){
  // some dev config
}else{
  app.use(csrf());
}

app.get('/article', function(req, res){
  var filePath = path.join(__dirname, '../../redirect/article1.html');
  res.sendFile(filePath);
});
app.use('/api', require('../modules/api/route'));
app.get('/*', require('../middlewares/renderStatic').main);


app.use(function(err, req, res, next) {
  console.log('come finally to the route error handler...');
  if(err){
    console.log(err);
  }
  res.json({
    result: 'handle error in the end'
  });
});

require('../config/initiator');

module.exports = app;
