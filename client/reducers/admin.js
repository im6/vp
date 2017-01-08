/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const admin = handleActions({
  ['admin/getList'](state, action) {
    console.log('loading admin list');
    return state.merge({
      loading: true
    });
  },

  ['admin/getList/success'](state, action) {
    return state.merge({
      loading: false,
      list: action.payload
    });
  },

  ['admin/getList/fail'](state, action) {
    console.error('admin error');
    return state.merge({
      list: [],
      loading: false
    });
  },

  ['admin/decideColor/success'](state, action) {
    return state.merge({
      loading: false,
      list: state.get('list').filter(v => v.get('id') != action.payload.id)
    });
  },

  ['admin/decideColor/fail'](state, action) {
    console.error('admin change error');
    return state;
  },

}, Immutable.fromJS({
  list: [],
  loading: false,
}));

export default admin;
