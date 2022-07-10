import { codeCdnUrl } from '../constant';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').config({
    path: '../vp.env',
  });
}

const { env } = process;

export const {
  PORT,
  SESSION_SECRET,
  CSRF_EXCEPTION,

  FB_API_URL,
  FB_APP_KEY,
  FB_APP_SECRET,
  FB_REDIRECT_URL,

  WB_API_URL,
  WB_APP_KEY,
  WB_APP_SECRET,
  WB_REDIRECT_URL,

  GH_API_URL,
  GH_APP_KEY,
  GH_APP_SECRET,
  GH_REDIRECT_URL,
} = env;

export const STATIC_URL =
  process.env.NODE_ENV === 'development' ? 'local' : 'dist';
export const PUBLIC_PATH =
  process.env.NODE_ENV === 'development' ? '/static' : codeCdnUrl;

export const SERVER_STATIC_PATH = `./${STATIC_URL}/server`;
export const SERVER_META_FILES = [
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
];

if (process.env.NODE_ENV !== 'development' && !CSRF_EXCEPTION) {
  // eslint-disable-next-line no-console
  console.log('No CSRF exception defined');
}
if (!PORT) {
  // eslint-disable-next-line no-console
  console.error('No port defined.');
  process.exit(1);
}
