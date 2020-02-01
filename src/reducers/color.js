/* eslint-disable */
import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';

const initialState = fromJS({
  loading: false,
  showVertical: true,

  colorDef: {},
  liked: {},

  colorIdAllByDate: [],
  colorIdAllByLike: [],
  colorIdByMyOwn: [],
});

const color = handleActions(
  {
    ['color/get'](state) {
      return state.set('loading', true);
    },

    ['color/get/success'](state, { payload }) {
      let colorIdAllByDate = List(),
        colorDef = Map();
      payload.forEach(v => {
        colorIdAllByDate = colorIdAllByDate.push(v.id);
        colorDef = colorDef.set(v.id, fromJS(v));
      });
      const colorIdAllByLike = payload
        .sort((a, b) => b.like - a.like)
        .map(v => v.id);
      return state.merge({
        colorIdAllByDate,
        colorIdAllByLike: fromJS(colorIdAllByLike),
        colorDef,
        loading: false,
      });
    },

    ['color/get/fail'](state) {
      return state.merge({
        colorIdAllByDate: List(),
        colorIdAllByLike: List(),
        loading: false,
      });
    },

    ['color/toggleLike'](state, action) {
      const { willLike, id } = action.payload;
      state = willLike
        ? state.setIn(['liked', id], true)
        : state.deleteIn(['liked', id]);
      state = state.updateIn(
        ['colorDef', id, 'like'],
        v => v + (willLike ? 1 : -1)
      );
      return state;
    },

    ['color/addNew/success'](state, action) {
      const { id } = action.payload;
      state = state.setIn(['colorDef', id], fromJS(action.payload));
      state = state.update('colorIdAllByDate', v => v.unshift(id));
      state = state.update('colorIdAllByLike', v => v.push(id));
      return state;
    },

    ['color/set/likes'](state, { payload }) {
      const liked = payload.reduce((acc, cur) => {
        return acc.set(cur, true);
      }, Map());
      return state.set('liked', liked);
    },
    ['color/set/owns'](state, { payload }) {
      return state.set('colorIdByMyOwn', List(payload));
    },
  },
  initialState
);

export default color;
