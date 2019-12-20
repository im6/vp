/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';

const initialState = Immutable.fromJS({
  loading: true,
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
      const colorId = [],
        colorDef = {};
      action.payload.forEach(v => {
        colorId.push(v.id.toString());
        colorDef[v.id] = v;
      });
      const colorIdByLike = action.payload
        .sort((a, b) => b.like - a.like)
        .map(v => v.id.toString());
      return state.merge({
        colorId: colorId,
        colorIdByLike,
        colorDef: fromJS(colorDef),
        loading: false,
      });
    },
    ['color/get/fail'](state) {
      return state.merge({
        colorId: [],
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
      if (!willLike) {
        state = state.updateIn(['myLiked'], v => {
          return v.filter(v1 => v1 !== id);
        });
      }
      return state;
    },

    ['color/addNew/success'](state, action) {
      const { id } = action.payload;
      state = state.setIn(['colorDef', id], fromJS(action.payload));
      state = state.updateIn(['colorId'], v => {
        v.unshift(id);
        return v;
      });
      return state;
    },

    ['color/getUserColor'](state, action) {
      state = state.set(action.payload, []);
      return state.set('loading', true);
    },
    ['color/getUserColor/success'](state, action) {
      const newList = [];
      action.payload.data.forEach(cur => {
        const idStr = cur.id.toString();
        newList.push(idStr);
        if (!state.getIn(['colorDef', idStr])) {
          state = state.setIn(['colorDef', idStr], fromJS(cur));
        }
      });
      state = state.set(action.payload.name, newList);
      return state.set('loading', false);
    },

    ['color/getUserColor/fail'](state, action) {
      state = state.set('loading', false);
      return state.set(action.payload.name, []);
    },

    ['color/set/likes'](state, action) {
      const liked = action.payload.reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
      }, {});
      return state.set('liked', fromJS(liked));
    },
  },
  initialState
);

export default color;
