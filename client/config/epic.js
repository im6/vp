import { combineEpics } from 'redux-observable';

import { adminAnonymousColorEpic, adminAdjudicateEpic } from '../epics/admin';
import { userAuthEpic, userLogOffEpic, userLoginEpic } from '../epics/user';

export default combineEpics(
  adminAnonymousColorEpic,
  adminAdjudicateEpic,

  userAuthEpic,
  userLogOffEpic,
  userLoginEpic
);
