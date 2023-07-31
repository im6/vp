/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  message: null,
  visible: false,
};

const modal = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction('modal/reset'), () => initialState)
    .addCase(createAction('modal/set'), (_, action) => ({
      type: action.payload[0],
      message: action.payload[1],
      visible: false,
    }))
    .addCase(createAction('modal/show'), (state) => {
      state.visible = true;
    })
    .addCase(createAction('modal/hide'), (state) => {
      state.visible = false;
    });
});

export default modal;
