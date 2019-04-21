const { env } = process;

export const isDev = env.NODE_ENV === 'development';
export const requireAuth = true;
export const fbApi = 'https://graph.facebook.com/v2.8';
export const {
  oauthRedirectDomin,
  fbAppSecret,
  fbAppKey,
  PORT
} = env;
export const sessionSecret = env.sessionSecret || 'bigAndHUgeSecret';
