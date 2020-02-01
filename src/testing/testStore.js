import { createStore, combineReducers } from 'redux';
import user from '../reducers/user';
import admin from '../reducers/admin';

const store = createStore(
  combineReducers({
    user,
    admin,
  })
);

export default store;
