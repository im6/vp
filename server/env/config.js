
var env = process.env;

module.exports = {
  isDev: env.NODE_ENV === 'dev',
  sessionSecret: env.sessionSecret || 'bigAndHUgeSecret',
  serverPort: env.OPENSHIFT_NODEJS_PORT || 8080,
  serverIp: env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
  requireAuth: true,
  weiboApi: 'https://api.weibo.com',
  weiboAppKey: env.weiboAppKey,
  weiboAppSecret: env.weiboAppSecret,
  weiboRedirectUrl: env.weiboRedirectUrl,
  restApi: env.restApi,
  mongodbUrl: env.mongodbUrl,

};