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

export default {
  appKey: '_COLORPK',

  ISMOBILE,
  BTNSIZE,
  BOXHT,
  BOXWD,
  BNNRPADDING,
};

