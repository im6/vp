const { env } = process;

export const isDev = env.NODE_ENV === 'development';
export const fbApi = 'https://graph.facebook.com/v2.8';
export const serverIp = 'localhost';
export const sessionSecret = env.sessionSecret || 'bigAndHUgeSecret';
export const {
  oauthRedirectDomin,
  fbAppSecret,
  fbAppKey,
  PORT: serverPort
} = env;