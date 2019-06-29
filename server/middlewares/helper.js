import get from 'lodash.get';

export const isAuth = (req, ignoreUserId) => {
  return Boolean(
    get(req, 'session.app.isAuth', false) &&
      (ignoreUserId || get(req, 'session.app.dbInfo.id', null))
  );
};

export const hasToken = req => {
  const token = get(req, 'session.app.tokenInfo.access_token', null);
  return typeof token === 'string' && token.length > 0;
};

export const isAdmin = req => {
  return isAuth(req) && get(req, 'session.app.dbInfo.isAdmin', false);
};
