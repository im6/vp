/* eslint-disable */
import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';

const initialState = fromJS({
  loading: false,
  showVertical: true,
  colorDef: {},
  liked: {},
  colorId: [], // main
  colorIdByLike: [], // popular route
  myPortfolio: [], // portfolio route
  myLiked: [], // liked list route
});

const color = handleActions(
  {
    ['color/get'](state) {
      return state.set('loading', true);
    },

    ['color/get/success'](state, action) {
      let colorId = List(),
        colorDef = Map();
      action.payload.forEach(v => {
        colorId = colorId.push(v.id);
        colorDef = colorDef.set(v.id, fromJS(v));
      });
      const colorIdByLike = action.payload
        .sort((a, b) => b.like - a.like)
        .map(v => v.id);
      return state.merge({
        colorId,
        colorIdByLike: fromJS(colorIdByLike),
        colorDef,
        loading: false,
      });
    },
    ['color/get/fail'](state) {
      return state.merge({
        colorId: List(),
        loading: false,
      });
    },

    ['color/toggleLike'](state, action) {
      const { willLike, id } = action.payload;
      state = state.setIn(['liked', id], willLike);
      state = state.updateIn(
        ['colorDef', id, 'like'],
        v => v + (willLike ? 1 : -1)
      );
      if (willLike) {
        state = state.update('myLiked', v => {
          return v.push(id);
        });
      } else {
        state = state.updateIn(['myLiked'], v => {
          return v.filter(v1 => v1 !== id);
        });
      }
      return state;
    },

    ['color/addNew/success'](state, action) {
      const { id } = action.payload;
      state = state.setIn(['colorDef', id], fromJS(action.payload));
      state = state.update('colorId', v => v.unshift(id));
      return state;
    },

    ['color/getUserColor'](state, action) {
      state = state.set(action.payload, List());
      return state.set('loading', true);
    },
    ['color/getUserColor/success'](state, action) {
      const newList = [];
      const { data, name } = action.payload;
      data.forEach(cur => {
        const { id } = cur;
        newList.push(id);
        if (!state.getIn(['colorDef', id])) {
          state = state.setIn(['colorDef', id], fromJS(cur));
        }
      });
      state = state.set(name, fromJS(newList));
      return state.set('loading', false);
    },

    ['color/getUserColor/fail'](state, action) {
      state = state.set('loading', false);
      return state.set(action.payload.name, List());
    },

    ['color/set/likes'](state, action) {
      const liked = action.payload.reduce((acc, cur) => {
        return acc.set(String(cur), true);
      }, Map());
      return state.set('liked', liked);
    },
  },
  initialState
);

export default color;
