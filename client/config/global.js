import {
  bannerStartLocation,
  mobileDetect,
  getBoxPercWidth,
} from '../misc/util.js';

const BTNSIZE = ISMOBILE ? 'small': 'default',
  BOXHT = ISMOBILE ? 230 : 285,
  BOXWD = getBoxPercWidth() + '%',
  BNNRPADDING = bannerStartLocation();

export const ISMOBILE = mobileDetect();
export default {
  appKey: '_COLORPK',

  ISMOBILE,
  BTNSIZE,
  BOXHT,
  BOXWD,
  BNNRPADDING,
};

