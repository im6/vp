"use strict";
const express = require('express'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  globalConfig = require('../config/env'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  csrf = require('csurf'),
  MongoStore = require('connect-mongo')(expressSession);

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
  sessionOpt.store = new MongoStore({
    url: process.env["mongodbUrl"],
    ttl: 2 * 24 * 60 * 60
  });
  console.log('session is now using mongo');
}

app.set('x-powered-by', false);
app.use(express.static(globalConfig.publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession(sessionOpt));


if(!globalConfig.isDev){
  app.use(csrf());
}else{
  // some production setup here
}

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
