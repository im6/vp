/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';

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
    console.error('init auth error'); // todo
    return state;
  },
  ['user/get/success'](state, action) {
    const { isAuth, profile } = action.payload;
    if(isAuth){
      state = state.set('isAuth', isAuth);
      state = state.set('detail', fromJS(profile));
    }
    return state;
  },
  ['user/logoff'](state) {
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
