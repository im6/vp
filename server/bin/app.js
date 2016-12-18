"use strict";
const path = require('path'),
  express = require('express'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  globalConfig = require('../config/env'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  csrf = require('csurf');

console.log(`NODE_ENV: ${globalConfig.isDev ? 'dev' : 'production'}`);
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
  app.locals.pretty = true;
}

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname,`../../${publicDir}/index.html`) );
});


app.use('/', require('../modules/main/route'));
app.use('/zj', require('../modules/zj/route'));
app.use('/login', require('../modules/login/route'));
app.use('/api1', require('../modules/api1/route'));




app.use(function(err, req, res, next) {
  console.log('come finally to the route error handler...');
  if(err){
    console.log(err);
  }
  res.json({
    result: 'handle error in the end'
  });
});



module.exports = app;
