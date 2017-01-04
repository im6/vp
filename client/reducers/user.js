/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const user = handleActions({
  ['user/initAuth'](state, action) {
    if(action.payload.alert){
      message.error(action.payload.alert.detail + ` (error: ${action.payload.alert.type})`, 5);
    }

    return state.merge({
      weiboUrl: action.payload.weiboUrl,
      facebookUrl: action.payload.facebookUrl
    });
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
    });
  }
}, Immutable.fromJS({
  isAuth: false,
  detail: null,
  weiboUrl: null,
  facebookUrl: null,
}));

export default user;
