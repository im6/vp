/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  list: null,
  loading: false,
};

const admin = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction('admin/getList'), (state) => {
      state.loading = true;
    })
    .addCase(createAction('admin/getList/success'), (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(createAction('admin/getList/fail'), (state) => {
      state.loading = false;
      state.list = [];
    })
    .addCase(createAction('admin/decideColor'), (state, action) => {
      state.list = state.list.filter((v) => v.id !== action.payload.id);
    });
});

export default admin;
