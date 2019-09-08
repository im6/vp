/* eslint no-console: 0 */
import get from 'lodash.get';
import { FB_REDIRECT_URL, FB_APP_SECRET, FB_APP_KEY } from '../config';
import { accessToken } from '../resource/oauth';
import { isAuth as isAuthHelper, isAdmin as isAdminHelper } from '../helper';

const getOauthQsObj = (_, qs) => {
  const { code } = qs;
  const result = {
    client_id: FB_APP_KEY,
    client_secret: FB_APP_SECRET,
    code,
    redirect_uri: FB_REDIRECT_URL,
  };
  return result;
};

export const oauthLogin = async (req, res) => {
  const code = get(req, 'query.code', null);
  const state = get(req, 'query.state', null);
  const oauth = get(req, 'params.oauth', null);
  const sessionState = get(req, 'session.app.oauthState', null);

  if (code && state && state === sessionState) {
    console.log(`redirected by ${oauth} auth...`);
    const qsObj = getOauthQsObj(oauth, req.query);
    const { data } = await accessToken(qsObj);
    if (data.access_token) {
      req.session.app = {
        oauth,
        isAuth: true,
        tokenInfo: data,
      };
    } else {
      req.session.app = {
        isAuth: false,
        authError: 'get token failed.',
      };
    }
  } else {
    console.log('inconsistant session, error msg in session');
    req.session.app = {
      isAuth: false,
      authError: 'Sorry, something error, please try again.',
    };
  }
  res.redirect('/');
};

export const isAuth = (req, res, next) => {
  if (isAuthHelper(req)) {
    next();
  } else {
    next('401 Unauthorized');
  }
};

export const isAdmin = (req, res, next) => {
  if (isAdminHelper(req)) {
    next();
  } else {
    next('403 Forbidden');
  }
};
