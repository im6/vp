/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const users = handleActions({
  ['users/get'](state, action) {
    console.log('loading users...');
    return state.merge({
      loading: true
    });
  },
  ['users/get/success'](state, action) {
    console.log('loading users success!');
    return state.merge({
      list: action.payload.get('data'),
      loading: false
    });
  },
  ['users/get/fail'](state, action) {
    console.error('loading users fail!');
    return state.merge({
      list: [],
      loading: false
    });
  }
}, Map({
  list: [],
  loading: true,
}));

export default users;
