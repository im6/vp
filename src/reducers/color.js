/* eslint-disable no-useless-computed-key, object-shorthand  */
import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';

const initialState = fromJS({
  loading: false,

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
      let colorIdAllByDate = List();
      let colorDef = Map();
      payload.forEach((v) => {
        colorIdAllByDate = colorIdAllByDate.push(v.id);
        colorDef = colorDef.set(v.id, fromJS(v));
      });
      const colorIdAllByLike = payload
        .sort((a, b) => b.like - a.like)
        .map((v) => v.id);
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

    ['color/toggleLike'](state, { payload }) {
      const { willLike, id } = payload;
      const newState = willLike
        ? state.setIn(['liked', id], true)
        : state.deleteIn(['liked', id]);
      return newState.updateIn(
        ['colorDef', id, 'like'],
        (v) => v + (willLike ? 1 : -1)
      );
    },

    ['color/addNew/success'](state, { payload }) {
      const { id } = payload;
      let newState = state.setIn(['colorDef', id], fromJS(payload));
      newState = newState.update('colorIdAllByDate', (v) => v.unshift(id));
      return newState.update('colorIdAllByLike', (v) => v.push(id));
    },

    ['color/set/likes'](state, { payload }) {
      const liked = payload.reduce((acc, cur) => acc.set(cur, true), Map());
      return state.set('liked', liked);
    },
    ['color/set/owns'](state, { payload }) {
      return state.set('colorIdByMyOwn', List(payload));
    },
  },
  initialState
);

export default color;
