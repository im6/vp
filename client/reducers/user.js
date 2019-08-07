/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';

const user = handleActions(
  {
    ['user/auth/success'](state, action) {
      const user = action.payload;
      // state = state.set('authReady', false);
      state = state.set('isAuth', true);
      state = state.set('detail', fromJS(user));
      return state;
    },

    ['user/auth/fail'](state, action) {
      return state.merge({
        authReady: true,
        facebookUrl: action.payload,
        isAuth: false,
      });
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
    },
  },
  Immutable.fromJS({
    authReady: false,
    isAuth: false,
    detail: null,
    facebookUrl: null,
  })
);

export default user;
