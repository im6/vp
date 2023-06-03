/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  detail: null,
  weiboUrl: null,
  githubUrl: null,
  facebookUrl: null,
  loading: false,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction('user/auth'), (state) => {
      state.loading = true;
    })
    .addCase(createAction('user/auth/success'), (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    })
    .addCase(createAction('user/auth/fail'), (state) => {
      state.loading = false;
      state.detail = null;
    })
    .addCase(createAction('user/logoff'), (state) => {
      state.detail = null;
    })
    .addCase(createAction('user/logoff/success'), (state, action) => {
      const { weiboUrl, githubUrl, facebookUrl } = action.payload;
      state.detail = null;
      state.weiboUrl = weiboUrl;
      state.githubUrl = githubUrl;
      state.facebookUrl = facebookUrl;
    });
});

export default user;
