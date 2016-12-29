/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const users = handleActions({
  ['color/get'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true
    });
  },
  ['color/get/success'](state, action) {
    console.log('loading color success!');
    return state.merge({
      list: action.payload,
      loading: false
    });
  },
  ['color/get/fail'](state, action) {
    console.error('loading color fail!');
    return state.merge({
      list: [],
      loading: false
    });
  },
  ['color/loadMore'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true
    });
  },
  ['color/loadMore/success'](state, action) {
    console.log('loading color success!');
    let newList = state.get('list').concat(Immutable.fromJS(action.payload));
    return state.merge({
      list: newList,
      loading: false
    });
  },
  ['color/loadMore/fail'](state, action) {
    console.error('loading color fail!');
    return state.merge({
      list: [],
      loading: false
    });
  }
}, Immutable.fromJS({
  list: [],
  loading: true,
}));

export default users;
