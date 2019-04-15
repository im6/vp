/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const user = handleActions({
  ['user/initAuth/success'](state, action) {
    return state.merge({
      authReady: true,
      weiboUrl: action.payload.weiboUrl,
      facebookUrl: action.payload.facebookUrl,
      googleUrl: action.payload.googleUrl,
    });
  },
  ['user/initAuth/fail'](state, action) {
    console.error('init auth error');
    return state;
  },
  ['user/initUser'](state, action) {
    if(action.payload.isAuth){
      message.success('Welcome! ' + action.payload.profile.name);
    }

    return state.merge({
      isAuth: action.payload.isAuth,
      detail: action.payload.profile,
    });
  },

  ['user/logoff'](state, action) {
    message.success('Log off successfully!');
    return state.merge({
      isAuth: false,
      detail: null,
      weiboUrl: null,
      facebookUrl: null,
      googleUrl: null,
    });
  }
}, Immutable.fromJS({
  authReady: false,
  isAuth: false,
  detail: null,
  weiboUrl: null,
  facebookUrl: null,
  googleUrl: null,
}));

export default user;
