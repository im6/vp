/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  detail: null,
  weiboUrl: null,
  githubUrl: null,
  facebookUrl: null,
  loading: false,
};

const user = handleActions(
  {
    ['user/auth'](state) {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    },
    ['user/auth/success'](state, { payload: detail }) {
      return produce(state, (draft) => {
        draft.loading = false;
        draft.detail = detail;
      });
    },

    ['user/auth/fail'](state) {
      return produce(state, (draft) => {
        draft.loading = false;
        draft.detail = null;
      });
    },

    ['user/logoff'](state) {
      return produce(state, (draft) => {
        draft.detail = null;
      });
    },

    ['user/logoff/success'](state, { payload }) {
      return produce(state, (draft) => {
        Object.assign(draft, payload, {
          detail: null,
        });
      });
    },
  },
  initialState
);

export default user;
