/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';

const user = handleActions({
  ['user/auth/success'](state, action) {
    const { user } = action.payload;
    if(user){
      state = state.set('isAuth', true);
      state = state.set('detail', fromJS(user));
      return state;
    } else {
      const { url: facebookUrl } = action.payload;
      return state.merge({
        authReady: true,
        facebookUrl,
        isAuth: false,
      });
    }
  },

  ['user/logoff'](state) {
    return state.merge({
      isAuth: false,
      authReady: false,
      detail: null,
      facebookUrl: null,
    });
  },

  ['user/logoff/success'](state, { payload }) {
    return state.merge({
      authReady: true,
      facebookUrl: payload,
    });
  }
}, Immutable.fromJS({
  authReady: false,
  isAuth: false,
  detail: null,
  facebookUrl: null,
}));

export default user;
