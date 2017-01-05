var env = process.env;

module.exports = {

  isDev: env.NODE_ENV === 'dev',
  publicDir: env.NODE_ENV === 'dev' ? 'temp' : 'public',
  requireAuth: true,

  serverPort: env.OPENSHIFT_NODEJS_PORT || 4000,
  serverIp: env.OPENSHIFT_NODEJS_IP || '127.0.0.1',

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
  mongodbUrl: env.mongodbUrl

};