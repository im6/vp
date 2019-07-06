import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import helmet from 'helmet';
import { oauthLogin } from '../middlewares/auth';
import csrf from '../middlewares/csrfOverride';
import graphqlMiddleware from '../middlewares/graphql';
import { h5Route, staticFile } from '../middlewares/staticRender';
import { onError, notFound } from '../middlewares/errorHandler';
import { SESSION_SECRET, _DEV_ } from '../config';

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
  app.get('/static/:fileName', staticFile);
} else {
  app.use(csrf);
}

app.use('/graphql', graphqlMiddleware);
app.get('/auth/:oauth', oauthLogin);
app.get('/*', h5Route);
app.use(onError);
app.use(notFound);

export default app;
