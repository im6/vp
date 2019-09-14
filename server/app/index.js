import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import { SESSION_SECRET } from '../config';

import { oauthLogin, isAuth, isAdmin } from '../middlewares/auth';
import { onError, onNotFound } from '../middlewares/errorHandler';
import { csrfOverride, csrfCookie } from '../middlewares/csrfHandler';
import graphqlMiddleware from '../middlewares/graphql';
import ssrMiddleware from '../middlewares/render';

const app = express();

if (process.env.NODE_ENV !== 'development') {
  app.set('trust proxy', true);
}

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: [SESSION_SECRET],
    domain:
      process.env.NODE_ENV === 'development'
        ? 'localhost'
        : 'react.colorpk.com',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    httpOnly: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const staticFile = require('../middlewares/staticFile');
  app.get('/static/:fileName', staticFile.default);

  app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
  });
} else {
  // for GraphiQL
  app.use(csrfOverride);
}

app[process.env.NODE_ENV === 'development' ? 'use' : 'post'](
  '/graphql',
  graphqlMiddleware
);
app.get('/auth/:oauth', oauthLogin);

app.get('/', csrfCookie, ssrMiddleware);
app.get('/latest', csrfCookie, ssrMiddleware);
app.get('/popular', csrfCookie, ssrMiddleware);
app.get('/color/:colorId', csrfCookie, ssrMiddleware);
app.get('/new', csrfCookie, ssrMiddleware);

app.get('/like', isAuth, ssrMiddleware);
app.get('/portfolio', isAuth, ssrMiddleware);
app.get('/adminpanel', isAdmin, ssrMiddleware);

app.use(onNotFound);
app.use(onError);

export default app;
