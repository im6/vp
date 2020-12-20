import get from 'lodash.get';

export const isAuth = (req, ignoreUserId) =>
  Boolean(
    get(req, 'session.app.isAuth', false) &&
      (ignoreUserId || get(req, 'session.app.dbInfo.id', null))
  );

export const getToken = (req) => {
  const token = get(req, 'session.app.tokenInfo.access_token', null);
  if (typeof token === 'string' && token.length > 0) {
    return token;
  }
  return null;
};

export const isAdmin = (req) =>
  isAuth(req) && get(req, 'session.app.dbInfo.isAdmin', false);
