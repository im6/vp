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
      list: action.payload.data,
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
  list: [
    { key: 0, value: 'Fiesta' },
    { key: 1, value: 'Porcelain' },
    { key: 2, value: 'Futuristic' },
    { key: 3, value: 'Spicy' },
    { key: 4, value: 'Vibrant' },
    { key: 5, value: 'Mute' },
    { key: 6, value: 'Innocent' },
    { key: 7, value: 'Transparent' },
    { key: 8, value: 'Earthy' },
    { key: 9, value: 'Velvet' },
    { key: 10, value: 'Retro' },
    { key: 11, value: 'Iridescent' },
    { key: 12, value: 'Neutral' },
  ],
  loading: false,
}));

export default colorType;
