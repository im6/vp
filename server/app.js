
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const globalConfig = require('./config/env');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const MySQLStore = require('express-mysql-session')(expressSession);
const staticRender = require('./middlewares/staticRender');
const errorHandler = require('./middlewares/errorHandler');
const apiRoute = require('./modules/api/route');

const app = express();
const sessionConfig = {
  secret: globalConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};

if (!globalConfig.isDev) {
  sessionConfig.store = new MySQLStore({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    checkExpirationInterval: 4 * 3600 * 1000,
    expiration: 12 * 3600 * 1000,
    schema: {
      tableName: 'old_sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
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
if (globalConfig.isDev) {
  // some dev config
} else {
  app.use(csrf());
}
app.use('/api', apiRoute);
app.get('/*', staticRender.h5Route, staticRender.staticFile);
app.use(errorHandler.onError);
app.use(errorHandler.notFound);

module.exports = app;
