/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  loading: false,

  colorDef: {},
  liked: {},

  colorIdAllByDate: [],
  colorIdAllByStar: [],
  colorIdByMyOwn: [],
};

const color = handleActions(
  {
    ['color/get'](state) {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    },

    ['color/get/success'](state, { payload }) {
      const colorIdAllByDate = [];
      const colorDef = {};
      payload.forEach((v) => {
        colorIdAllByDate.push(v.id);
        colorDef[v.id] = v;
      });
      const colorIdAllByStar = payload
        .sort((a, b) => b.star - a.star)
        .map((v) => v.id);
      return produce(state, (draft) => {
        Object.assign(draft, {
          colorIdAllByDate,
          colorIdAllByStar,
          colorDef,
          loading: false,
        });
      });
    },

    ['color/get/fail'](state) {
      return produce(state, (draft) => {
        draft.loading = false;
        draft.colorIdAllByDate = [];
        draft.colorIdAllByStar = [];
      });
    },

    ['color/toggleLike'](state, { payload }) {
      const { willLike, id } = payload;
      return produce(state, (draft) => {
        if (willLike) {
          draft.liked[id] = true;
        } else {
          delete draft.liked[id];
        }
        draft.colorDef[id].star += willLike ? 1 : -1;
      });
    },

    ['color/addNew/success'](state, { payload }) {
      const { id } = payload;
      return produce(state, (draft) => {
        draft.colorDef[id] = payload;
        draft.colorIdAllByDate.unshift(id);
        draft.colorIdAllByStar.push(id);
      });
    },

    ['color/set/likes'](state, { payload }) {
      return produce(state, (draft) => {
        const liked = payload.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {});
        draft.liked = liked;
      });
    },
    ['color/set/owns'](state, { payload }) {
      return produce(state, (draft) => {
        draft.colorIdByMyOwn = payload;
      });
    },
  },
  initialState
);

export default color;
