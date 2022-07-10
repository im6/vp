import get from 'lodash.get';

export const isAuth = (req, ignoreUserId) =>
  Boolean(
    get(req, 'session.app.isAuth', false) &&
      (ignoreUserId || get(req, 'session.app.dbInfo.id', null))
  );

export const getTokenInfo = (req) => get(req, 'session.app.tokenInfo', null);

export const isAdmin = (req) =>
  isAuth(req) && get(req, 'session.app.dbInfo.isAdmin', false);
