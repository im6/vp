import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import admin from '../reducers/admin';
import color from '../reducers/color';

const store = configureStore({
  reducer: {
    user,
    admin,
    color,
  },
});

export default store;
