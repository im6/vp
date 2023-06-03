/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  message: null,
  visible: false,
};

const modal = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction('modal/cycle/reset'), () => initialState)
    .addCase(createAction('modal/cycle/show'), (state) => {
      state.visible = true;
    })
    .addCase(createAction('modal/cycle/hide'), (state) => {
      state.visible = false;
    })
    // admin reducer
    .addCase(createAction('modal/admin/getList/fail'), () => ({
      type: 'danger',
      message: 'Admin data error',
      visible: false,
    }))
    .addCase(createAction('modal/admin/decideColor/success'), () => ({
      type: 'success',
      message: 'Adjudicate successfully',
      visible: false,
    }))
    .addCase(createAction('modal/admin/decideColor/fail'), () => ({
      type: 'danger',
      message: 'Adjudicate failed',
      visible: false,
    }))
    // color reducer
    .addCase(createAction('modal/color/get/fail'), () => ({
      type: 'danger',
      message: 'Get color data error.',
      visible: false,
    }))
    .addCase(createAction('modal/color/copy'), () => ({
      type: 'success',
      message: 'Copy to clipboard successfully',
      visible: false,
    }))
    .addCase(createAction('modal/color/addNew/success'), () => ({
      type: 'success',
      message: 'Create color successfully, thanks.',
      visible: false,
    }))
    .addCase(createAction('modal/color/addNew/fail'), () => ({
      type: 'danger',
      message: 'Create color failed.',
      visible: false,
    }))
    .addCase(createAction('modal/color/addNew/invalid'), () => ({
      type: 'danger',
      message: 'Invalid color value.',
      visible: false,
    }))
    .addCase(createAction('modal/color/download'), () => ({
      type: 'link',
      message: 'Downloading ...',
      visible: false,
    }))
    // user reducer
    .addCase(createAction('modal/user/logoff'), () => ({
      type: 'info',
      message: 'Logout successfully.',
      visible: false,
    }))
    .addCase(createAction('modal/user/auth/fail'), () => ({
      type: 'danger',
      message: 'Log in failed',
      visible: false,
    }))
    .addCase(createAction('modal/user/greet'), (_, action) => ({
      type: 'success',
      message: `Welcome back, ${action.payload}`,
      visible: false,
    }));
});

export default modal;
