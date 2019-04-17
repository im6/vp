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
  ['color/get/fail'](state, action) {
    message.error('create new color failed! ' + action.payload.code);
    return state.merge({
      colorId: [],
      loading: false
    });
  },

  ['color/getPortfolio'](state, action) {
    return state.merge({
      loading: true,
    });
  },
  ['color/getPortfolio/success'](state, action) {
    return state.merge({
      loading: false,
      myPortfolio: action.payload || []
    });
  },

  ['color/getPortfolio/fail'](state, action) {
    return state.merge({
      loading: false,
      myPortfolio: []
    });
  },

  ['color/getLike'](state, action) {
    return state.merge({
      loading: true,
    });
  },
  ['color/getLike/success'](state, action) {
    return state.merge({
      loading: false,
      myLiked: action.payload || []
    });
  },
  ['color/getLike/fail'](state, action) {
    return state.merge({
      loading: false,
      myLiked: action.payload || []
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
    let newData = action.payload;
    let newColor = {
      ...newData,
      like: 0,
      liked: false
    };
    return state.merge({
      list: [newColor, ...state.get('list')]
    });
  },

  ['color/addNew/fail'](state, action) {
    message.error('create new color failed! ' + action.payload.msg.code);
    return state;
  },

  ['color/getLikeColor'](state, action) {
    return state.merge({
      list: [],
      loading: true
    });
  },
  ['color/getLikeColor/fail'](state, action) {
    let newList = state.get('list').concat(Immutable.fromJS(action.payload));
    return state.merge({
      list: newList,
      loading: false
    });
  },
  ['color/getLikeColor/fail'](state, action) {
    message.error('Getting favourite color error. Please try again');
    return state.merge({
      loading: false
    });
  },
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
