"use strict";
const path = require('path'),
  express = require('express'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  globalConfig = require('../env/config'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  csrf = require('csurf');


const publicDir = globalConfig.isDev ? 'temp' : 'public';
const app = express();

app.set('x-powered-by', false);
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession({
  //store: new RedisStore,
  secret: globalConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }   /// this secure is set to be true only if https site
}));


if(!globalConfig.isDev){
  app.use(csrf());
}else{
  console.log('Under DEV environment...');
  app.locals.pretty = true;
}


app.use('/', require('../server/modules/main/route'));
app.use('/zj', require('../server/modules/zj/route'));
app.use('/login', require('../server/modules/login/route'));
app.use('/api1', require('../server/modules/api1/route'));



app.use(function(err, req, res, next) {
  console.log('test');
  if(err){
    console.log(err);
  }
  res.json({
    result: 'handle error in the end'
  });
});



module.exports = app;
