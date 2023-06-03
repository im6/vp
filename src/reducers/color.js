/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  loading: false,

  colorDef: {},
  liked: {},

  colorIdAllByDate: [],
  colorIdAllByStar: [],
  colorIdByMyOwn: [],
};

const color = createReducer(initialState, (builder) => {
  builder
    .addCase(createAction('color/get'), (state) => {
      state.loading = true;
    })
    .addCase(createAction('color/get/success'), (state, action) => {
      const { payload } = action;
      const colorIdAllByDate = [];
      const colorDef = {};
      payload.forEach((v) => {
        colorIdAllByDate.push(v.id);
        colorDef[v.id] = v;
      });
      const colorIdAllByStar = payload
        .sort((a, b) => b.star - a.star)
        .map((v) => v.id);

      state.loading = false;
      state.colorDef = colorDef;
      state.colorIdAllByDate = colorIdAllByDate;
      state.colorIdAllByStar = colorIdAllByStar;
    })
    .addCase(createAction('color/get/fail'), (state) => {
      state.loading = false;
      state.colorIdAllByDate = [];
      state.colorIdAllByStar = [];
    })
    .addCase(createAction('color/toggleLike'), (state, action) => {
      const { willLike, id } = action.payload;
      if (willLike) {
        state.liked[id] = true;
      } else {
        delete state.liked[id];
      }
      state.colorDef[id].star += willLike ? 1 : -1;
    })
    .addCase(createAction('color/addNew/success'), (state, action) => {
      const { payload } = action;
      const { id } = payload;
      state.colorDef[id] = payload;
      state.colorIdAllByDate.unshift(id);
      state.colorIdAllByStar.push(id);
    })
    .addCase(createAction('color/set/likes'), (state, action) => {
      const liked = action.payload.reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
      }, {});
      state.liked = liked;
    })
    .addCase(createAction('color/set/owns'), (state, action) => {
      state.colorIdByMyOwn = action.payload;
    });
});

export default color;
