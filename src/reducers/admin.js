/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  list: null,
  loading: false,
});

const admin = handleActions(
  {
    ['admin/getList'](state) {
      return state.set('loading', true);
    },

    ['admin/getList/success'](state, action) {
      return state.merge({
        loading: false,
        list: Immutable.fromJS(action.payload),
      });
    },

    ['admin/getList/fail'](state) {
      return state.merge({
        list: Immutable.fromJS([]),
        loading: false,
      });
    },

    ['admin/decideColor'](state, { payload }) {
      const newState = state.updateIn(['list'], (list) =>
        list.filter((v) => v.get('id') !== payload.id)
      );

      return newState;
    },
  },
  initialState
);

export default admin;
