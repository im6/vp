/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  detail: null,
  facebookUrl: null,
  lang: null,
});

const user = handleActions(
  {
    ['user/auth/success'](state, { payload: detail }) {
      return state.merge({
        detail: fromJS(detail),
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

    ['user/setLanguage'](state, { payload }) {
      return state.set('lang', payload);
    },
  },
  initialState
);

export default user;
