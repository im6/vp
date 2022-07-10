/* eslint no-console: 0 */
import get from 'lodash.get';
import { v1 as uuidV1 } from 'uuid';
import {
  fetchFacebookToken,
  fetchWeiboToken,
  fetchGithubToken,
  createLoginLink,
} from '../resource/oauth';
import { isAuth as isAuthHelper, isAdmin as isAdminHelper } from '../helper';

export const oauthLogin = async (req, res) => {
  const code = get(req, 'query.code', null);
  const state = get(req, 'query.state', null);
  const oauth = get(req, 'params.oauth', null);
  const oauthState = get(req, 'session.app.oauthState', null);

  if (code && state && state === oauthState) {
    console.log(`redirected by ${oauth} auth...`);
    let tokenInfo = null;
    if (oauth === 'fb') {
      tokenInfo = await fetchFacebookToken(code);
    } else if (oauth === 'wb') {
      tokenInfo = await fetchWeiboToken(code);
    } else if (oauth === 'gh') {
      tokenInfo = await fetchGithubToken(code);
    } else {
      throw new Error();
    }

    if (tokenInfo) {
      req.session.app = {
        oauth,
        isAuth: true,
        tokenInfo,
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

export const oauthLogout = (req, res) => {
  const username = get(req, 'session.app.dbInfo.name', 'unknown');
  console.log(`logoff (${username}), delete session`); // eslint-disable-line no-console
  delete req.session.app;

  const oauthState = uuidV1();
  req.session.app = {
    oauthState,
  };

  res.json({
    weiboUrl: createLoginLink('wb', oauthState),
    githubUrl: createLoginLink('gh', oauthState),
    facebookUrl: createLoginLink('fb', oauthState),
  });
};

export const isAuth = (req, res, next) => {
  if (isAuthHelper(req)) {
    next();
  } else {
    next(401);
  }
};

export const isAdmin = (req, res, next) => {
  if (isAdminHelper(req)) {
    next();
  } else {
    next(403);
  }
};
