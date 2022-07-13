/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  list: null,
  loading: false,
};

const admin = handleActions(
  {
    ['admin/getList'](state) {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    },

    ['admin/getList/success'](state, action) {
      return produce(state, (draft) => {
        draft.loading = false;
        draft.list = action.payload;
      });
    },

    ['admin/getList/fail'](state) {
      return produce(state, (draft) => {
        draft.loading = false;
        draft.list = [];
      });
    },

    ['admin/decideColor'](state, { payload }) {
      return produce(state, (draft) => {
        draft.list = state.list.filter((v) => v.id !== payload.id);
      });
    },
  },
  initialState
);

export default admin;
