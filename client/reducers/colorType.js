/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const colorType = handleActions({
  ['colorType/get'](state, action) {
    console.log('loading type...');
    return state.merge({
      loading: true
    });
  },
  ['colorType/get/success'](state, action) {
    console.log('loading type success!');
    return state.merge({
      list: action.payload,
      loading: false
    });
  },
  ['colorType/get/fail'](state, action) {
    console.error('loading color fail!');
    return state.merge({
      list: [],
      loading: false
    });
  }
}, Immutable.fromJS({
  list: [],
  loading: false,
}));

export default colorType;
