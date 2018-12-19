"use strict";
const express = require('express'),
  path = require('path'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  globalConfig = require('./config/env'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  csrf = require('csurf'),
  helmet = require('helmet'),
  MySQLStore = require('express-mysql-session')(expressSession),
  staticRender = require('./middlewares/staticRender'),
  errorHandler = require('./middlewares/errorHandler'),
  app = express(),
  sessionConfig = {
    secret: globalConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    }
  };

if(!globalConfig.isDev){
  sessionConfig.store = new MySQLStore({
    host     : process.env['SQL_HOST'],
    port     : process.env['SQL_PORT'],
    user     : process.env['SQL_USERNAME'],
    password : process.env['SQL_PASSWORD'],
    database : process.env['SQL_DATABASE'],
    checkExpirationInterval: 4 * 3600 * 1000,
    expiration: 12 * 3600 * 1000,
    schema: {
      tableName: 'old_sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  });
  console.log('session is now using mysql');
}

app.set('x-powered-by', false);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession(sessionConfig));
if(globalConfig.isDev){
  // some dev config
}else{
  app.use(csrf());
}
app.use('/api', require('./modules/api/route'));
app.get('/*', staticRender.h5Route, staticRender.staticFile);
app.use(errorHandler.onError);
app.use(errorHandler.notFound);

module.exports = app;
