import helmet from 'helmet';
import express from 'express';
import { json as bpJson, urlencoded as bpUrlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import redisSession from '../resource/redisSession';
import { connect } from '../resource/mongodb/connection';

import { SERVER_META_FILES } from '../constant.server';

import { oauthLogin, oauthLogout, isAuth, isAdmin } from '../middlewares/auth';
import {
  onError,
  onNotFound,
  onGcpAppEngSig,
} from '../middlewares/errorHandler';
import csrfOverride from '../middlewares/csrfHandler';
import graphqlMiddleware from '../middlewares/graphql';
import ssrMiddleware from '../middlewares/render';

const app = express();
const publicUrls = ['/', '/latest', '/popular', '/color/:id', '/new', '/like'];

connect();

if (process.env.NODE_ENV !== 'development') {
  app.set('trust proxy', true);
}

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(bpJson());
app.use(bpUrlencoded({ extended: false }));
app.use(cookieParser());
app.use(redisSession);

if (process.env.NODE_ENV === 'development') {
  app.use('/static', express.static('local/public'));
  app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
  });
} else {
  // eslint-disable-next-line global-require
  const staticFileProd = require('../middlewares/staticFile').default;
  SERVER_META_FILES.forEach((v) => {
    app.get(v, staticFileProd);
  });
  app.get('/_ah/:action', onGcpAppEngSig); // gcp status actuator
  app.use(csrfOverride);
}

app[process.env.NODE_ENV === 'development' ? 'use' : 'post'](
  '/graphql',
  graphqlMiddleware
);
if (process.env.NODE_ENV === 'development') {
  // GraphiQL doesn't go through csrf
  app.use(csrfOverride);
}

app.get('/auth/logout', oauthLogout);
app.get('/auth/:oauth', oauthLogin);

publicUrls.forEach((url) => {
  app.get(url, ssrMiddleware);
});

app.get('/portfolio', isAuth, ssrMiddleware);
app.get('/adminpanel', isAdmin, ssrMiddleware);

app.use(onNotFound);
app.use(onError);

export default app;
