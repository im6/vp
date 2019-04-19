/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, { fromJS } from 'immutable';
import { message } from 'antd';

const color = handleActions({

  ['color/get'](state) {
    return state.merge({
      loading: true
    });
  },

  ['color/get/success'](state, action) {
    const colorId = [], colorDef = {};

    action.payload.forEach(v => {
      colorId.push(v.id.toString());
      colorDef[v.id] = v;
    });
    const colorIdByLike = action.payload.sort((a, b) => (b.like - a.like)).map(v => v.id.toString());

    return state.merge({
      colorId: colorId,
      colorIdByLike,
      colorDef: fromJS(colorDef),
      loading: false
    });
  },
  ['color/get/fail'](state) {
    return state.merge({
      colorId: [],
      loading: false
    });
  },
  ['color/loadMore'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['color/loadMore/success'](state, action) {
    let newList = state.get('list').concat(Immutable.fromJS(action.payload));
    return state.merge({
      list: newList,
      loading: false
    });
  },
  ['color/loadMore/fail'](state, action) {
    console.error('loading color fail!');
    return state.merge({
      list: [],
      loading: false
    });
  },

  ['color/toggleLike'](state, action) {
    const { willLike, id } = action.payload;
    state = state.setIn(['liked', id], willLike);
    state = state.updateIn(['colorDef', id, 'like'], v => v + (willLike ? 1 : -1));
    return state;
  },

  ['color/initLike'](state, action) {
    let likedList = action.payload.like,
      lcjs = {};
    if(likedList){
      likedList.forEach(v => {
        lcjs['d' + v] = true
      })
    }

    return state.update('liked', (v) => v.merge(lcjs));
  },

  ['color/addNew/success'](state, action) {
    const { color, id } = action.payload;
    state = state.setIn(['colorDef', id], fromJS(action.payload));
    state = state.updateIn(['colorId'], v => {
      v.unshift(id);
      return v;
    });

    return state;
  },

  ['color/addNew/fail'](state, action) {
    return state;
  },

  ['color/getUserColor'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['color/getUserColor/success'](state, action) {
    const newList = [];
    action.payload.data.forEach(cur => {
      const idStr = cur.id.toString();
      newList.push(idStr);
      if(!state.getIn(['colorDef', idStr])){
        state = state.setIn(['colorDef', idStr], fromJS(cur));
      }
    });
    state = state.set(action.payload.name, newList);
    state = state.set('loading', false);
    return state;
  },

  ['color/getUserColor/fail'](state, action) {
    state = state.set('loading', false);
    state = state.set(action.payload.name, []);
    return state;
  },

  ['color/set/likes'](state, action) {
    const liked = action.payload.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {})
    state = state.set('liked', fromJS(liked));
    return state;
  }
}, Immutable.fromJS({
  loading: true,
  colorId: [],
  colorIdByLike: [],
  colorDef: {},
  liked: {},
  myPortfolio: [],
  myLiked: [],
}));

export default color;
