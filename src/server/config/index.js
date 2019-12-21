const { env } = process;

export const {
  SERVER_PORT,
  SESSION_SECRET,
  CSRF_EXCEPTION,
  FB_APP_KEY,
  FB_APP_SECRET,
  FB_REDIRECT_URL,
} = env;

export const FB_API_URL = 'https://graph.facebook.com/v3.3';
export const SERVER_IP = 'localhost';
export const STATIC_URL =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const PUBLIC_PATH =
  process.env.NODE_ENV === 'development'
    ? '/static/'
    : '//dkny.oss-cn-hangzhou.aliyuncs.com/2/';

if (process.env.NODE_ENV !== 'development' && !CSRF_EXCEPTION) {
  // eslint-disable-next-line no-console
  console.log('No CSRF exception defined');
}
