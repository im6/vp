import { createStore, combineReducers } from 'redux';
import user from '../reducers/user';
import admin from '../reducers/admin';
import color from '../reducers/color';

const store = createStore(
  combineReducers({
    user,
    admin,
    color,
  })
);

export default store;
