/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';


const auth = handleActions({
  ['auth/login'](state, action) {
    console.log('loading users...');
    return state.merge({
      isAuth: true,
      userInfo: action.payload
    });
  },
  ['auth/logoff'](state, action) {
    console.log('loading users success!');
    return state.merge({
      isAuth: false,
      userInfo: null
    });
  }
}, Immutable.fromJS({
  isAuth: false,
  userInfo: null
}));

export default auth;
