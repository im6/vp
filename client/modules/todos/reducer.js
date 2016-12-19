/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const todos = handleActions({
  ['todos/get'](state, action) {
    console.log('loading todos...');
    return state.merge({
      loading: true,
      todoList: []
    });
  },
  ['todos/get/success'](state, action) {
    console.log('loading todos success!');
    debugger;
    return state.merge({
      loading: false,
      todoList: action.payload.data
    });
  },
  ['todos/get/fail'](state, action) {
    console.error('loading todos fail!');
    return state.merge({
      loading: false,
      todoList: []
    });
  }
}, Map({
  todoList: [],
  loading: false,
}));

export default todos;
