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
      return state.merge({
        loading: true,
      });
    },

    ['admin/getList/success'](state, action) {
      return state.merge({
        loading: false,
        list: Immutable.fromJS(action.payload),
      });
    },

    ['admin/getList/fail'](state, action) {
      console.error('admin error');
      return state.merge({
        list: [],
        loading: false,
      });
    },

    ['admin/decideColor/success'](state, action) {
      return state.merge({
        loading: false,
        list: state.get('list').filter(v => v.get('id') != action.payload),
      });
    },

    ['admin/decideColor/fail'](state, action) {
      console.error('admin change error');
      return state;
    },
  },
  initialState
);

export default admin;
