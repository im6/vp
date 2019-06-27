const { env } = process;

export const {
  NODE_ENV,
  SERVER_PORT,
  SESSION_SECRET,

  FB_APP_KEY,
  FB_APP_SECRET,
  FB_REDIRECT_URL,
} = env;

export const _DEV_ = NODE_ENV === 'development';
export const FB_API_URL = 'https://graph.facebook.com/v3.3';
export const SERVER_IP = 'localhost';
export const STATIC_URL = _DEV_ ? 'local' : 'dist';
