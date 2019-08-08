/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';

const user = handleActions(
  {
    ['user/auth/success'](state, action) {
      const user = action.payload;
      return state.merge({
        detail: fromJS(user),
        facebookUrl: null,
      });
    },

    ['user/auth/fail'](state, { payload }) {
      return state.merge({
        detail: null,
        facebookUrl: payload,
      });
    },

    ['user/logoff'](state) {
      return state.merge({
        detail: null,
        facebookUrl: null,
      });
    },
  },
  Immutable.fromJS({
    detail: null,
    facebookUrl: null,
  })
);

export default user;
