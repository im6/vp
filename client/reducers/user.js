/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const user = handleActions({
  ['user/initAuth'](state, action) {
    return state.merge({
      weiboUrl: action.payload.weiboUrl
    });
  },
  ['user/initUser'](state, action) {
    return state.merge({
      isAuth: action.payload.isAuth,
      detail: action.payload.userInfo,
    });
  },
  ['user/login'](state, action) {
    return state.merge({
      isAuth: true,
      detail: action.payload
    });
  },
  ['user/logoff'](state, action) {
    return state.merge({
      isAuth: false,
      detail: null,
      weiboUrl: null
    });
  }
}, Immutable.fromJS({
  isAuth: false,
  detail: null,
  weiboUrl: null
}));

export default user;
