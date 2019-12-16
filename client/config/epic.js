import { combineEpics } from 'redux-observable';

import { adminAnonymousColorEpic, adminAdjudicateEpic } from '../epics/admin';
import { userAuthEpic, userLogOffEpic, userLoginEpic } from '../epics/user';

import {
  getInitColorsEpic,
  getUserColorsEpic,
  toggleLikeEpic,
  colorShareEpic,
  colorDownloadEpic,
} from '../epics/color';

export default combineEpics(
  adminAnonymousColorEpic,
  adminAdjudicateEpic,

  userAuthEpic,
  userLogOffEpic,
  userLoginEpic,

  getInitColorsEpic,
  getUserColorsEpic,
  toggleLikeEpic,
  colorShareEpic,
  colorDownloadEpic
);
