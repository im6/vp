/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  detail: null,
  facebookUrl: null,
  lang: null,
  loading: false,
});

const user = handleActions(
  {
    ['user/auth'](state) {
      return state.merge({
        loading: true,
      });
    },
    ['user/auth/success'](state, { payload: detail }) {
      return state.merge({
        detail: fromJS(detail),
        loading: false,
      });
    },

    ['user/auth/fail'](state) {
      return state.merge({
        detail: null,
        loading: false,
      });
    },

    ['user/logoff'](state) {
      return state.merge({
        detail: null,
      });
    },

    ['user/logoff/success'](state, { payload }) {
      return state.merge({
        facebookUrl: payload,
      });
    },

    ['user/setLanguage'](state, { payload }) {
      return state.set('lang', payload);
    },
  },
  initialState
);

export default user;
