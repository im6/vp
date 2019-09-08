import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import { SESSION_SECRET, _DEV_ } from '../config';
import oauthLogin from '../middlewares/auth';
import onError from '../middlewares/errorHandler';
import { csrfOverride, csrfCookie } from '../middlewares/csrfHandler';
import graphqlMiddleware from '../middlewares/graphql';
import ssrMiddleware from '../middlewares/render';

const app = express();

app.set('x-powered-by', false);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: [SESSION_SECRET],
    domain: _DEV_ ? 'localhost' : 'react.colorpk.com',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    httpOnly: true,
  })
);

if (_DEV_) {
  // eslint-disable-next-line global-require
  const staticFile = require('../middlewares/staticFile');
  app.get('/static/:fileName', staticFile.default);
} else {
  app.use(csrfOverride);
}

app.use('/graphql', graphqlMiddleware);
app.get('/auth/:oauth', oauthLogin);

app.get('/', csrfCookie, ssrMiddleware);
app.get('/latest', csrfCookie, ssrMiddleware);
app.get('/popular', csrfCookie, ssrMiddleware);
app.get('/color/:colorId', csrfCookie, ssrMiddleware);
app.get('/new', csrfCookie, ssrMiddleware);

app.get('/like', csrfCookie, ssrMiddleware);
app.get('/portfolio', csrfCookie, ssrMiddleware);
app.get('/adminpanel', csrfCookie, ssrMiddleware);

app.use(onError);

export default app;
