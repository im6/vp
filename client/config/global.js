const env = process.env;
import {
  bannerStartLocation,
  mobileDetect,
  getBoxPercWidth,
} from '../misc/util.js';

const ISMOBILE = mobileDetect(),
  BTNSIZE = ISMOBILE ? 'small': 'default',
  BOXHT = ISMOBILE ? 230 : 285,
  BOXWD = getBoxPercWidth() + '%',
  BNNRPADDING = bannerStartLocation();

export const Global = {
  isDev: env.NODE_ENV === 'dev',
  appKey: '_COLORPK',

  ISMOBILE,
  BTNSIZE,
  BOXHT,
  BOXWD,
  BNNRPADDING,
};

