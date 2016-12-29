var env = process.env;

module.exports = {

  isDev: env.NODE_ENV === 'dev',
  publicDir: env.NODE_ENV === 'dev' ? 'temp' : 'public',
  requireAuth: true,

  serverPort: env.OPENSHIFT_NODEJS_PORT || 4000,
  serverIp: env.OPENSHIFT_NODEJS_IP || '127.0.0.1',


  weiboApi: 'https://api.weibo.com',
  weiboAppKey: env.weiboAppKey,
  weiboAppSecret: env.weiboAppSecret,
  weiboRedirectUrl: env.weiboRedirectUrl,

  sessionSecret: env.sessionSecret || 'bigAndHUgeSecret',
  mongodbUrl: env.mongodbUrl

};