var env = process.env;

//NPM_CONFIG_PRODUCTION = true  or NPM_USE_PRODUCTION

module.exports = {
  isDev: env.NODE_ENV === 'dev',
  requireAuth: true,

  serverPort: env.PORT || 3000,
  serverIp: 'localhost',

  wbApi: 'https://api.weibo.com',
  wbAppKey: env.wbAppKey,
  wbAppSecret: env.wbAppSecret,

  fbApi: 'https://graph.facebook.com/v2.8',
  fbAppKey: env.fbAppKey,
  fbAppSecret: env.fbAppSecret,

  ggApi: 'https://www.googleapis.com',
  ggAppKey: env.ggAppKey,
  ggAppSecret: env.ggAppSecret,

  oauthRedirectDomin: env.oauthRedirectDomin,
  sessionSecret: env.sessionSecret || 'bigAndHUgeSecret',
};