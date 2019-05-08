import express from 'express';
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import expressSession from 'express-session';
import csrf from 'csurf';
import helmet from 'helmet';
import mysqlSession from 'express-mysql-session';
import route from './modules/api/route';
import {
  h5Route,
  staticFile,
} from './middlewares/staticRender';
import {
  onError,
  notFound,
} from './middlewares/errorHandler';
import {
  sessionSecret,
  isDev,
} from './config'

const app = express();
const sessionConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};

if (!isDev) {
  const mySQLStore = mysqlSession(expressSession);
  sessionConfig.store = new mySQLStore({
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
app.use(cookieParser());
app.use(expressSession(sessionConfig));
if (isDev) {
  // some dev config
} else {
  app.use(csrf());
}
app.use('/api', route);
app.get('/*', h5Route, staticFile);
app.use(onError);
app.use(notFound);

export default app;
