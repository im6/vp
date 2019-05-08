const { env } = process;

export const {
  oauthRedirectDomin,
  fbAppSecret,
  fbAppKey,
  PORT: serverPort
} = env;

export const isDev = env.NODE_ENV === 'development';
export const fbApi = 'https://graph.facebook.com/v2.8';
export const serverIp = 'localhost';
export const sessionSecret = env.sessionSecret || 'bigAndHUgeSecret';
export const redirect_uri_fb = `${isDev? `http://localhost:${serverPort}` : oauthRedirectDomin}/api/login/fb`;