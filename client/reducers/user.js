/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const user = handleActions({
  ['user/initAuth'](state, action) {
    return state.merge({
      weiboUrl: action.payload.weiboUrl
    });
  },
  ['user/initUser'](state, action) {
    if(action.payload.isAuth){
      message.success('Welcome! ' + action.payload.userInfo.name);
    }

    return state.merge({
      isAuth: action.payload.isAuth,
      detail: action.payload.userInfo,
    });
  },

  ['user/logoff'](state, action) {
    message.success('Log off successfully!');
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
