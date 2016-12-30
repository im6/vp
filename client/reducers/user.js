/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const user = handleActions({
  ['user/toggleLike'](state, action) {
    return state.merge({
      loading: true
    });
  }
}, Immutable.fromJS({
  isAuth: false,
  detail: null
}));

export default user;
