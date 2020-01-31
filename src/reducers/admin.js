/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  list: [],
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

    ['admin/getList/fail'](state, action) {
      return state.merge({
        list: Immutable.fromJS([]),
        loading: false,
      });
    },

    ['admin/decideColor/success'](state, action) {
      state = state.updateIn(['list'], list =>
        list.filter(v => v.get('id') !== action.payload)
      );

      return state.set('loading', false);
    },
  },
  initialState
);

export default admin;
