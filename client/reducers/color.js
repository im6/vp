/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const color = handleActions({

  ['color/get'](state, action) {
    return state.merge({
      loading: true
    });
  },

  ['color/get/success'](state, action) {
    return state.merge({
      list: action.payload || [] ,
      loading: false
    });
  },
  ['color/get/fail'](state, action) {
    console.error('loading color fail!');
    return state.merge({
      list: [],
      loading: false
    });
  },

  ['color/setView'](state, action) {
    return state.merge({
      view: action.payload
    });
  },

  ['color/getPortfolio'](state, action) {
    return state.merge({
      loading: true,
      view: 'portfolio'
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
      view: 'like'
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
    let newLiked = null;

    let gonnaLike = action.payload.willLike;

    if(gonnaLike){
      let newMap = {};
      newMap['d'+action.payload.id] = true;
      newLiked = state.get('liked').merge(newMap);
    }else{
      newLiked = state.get('liked').delete('d'+action.payload.id);
    }

    let newList = state.get('list').update(action.payload.index, function(v){
      return v.merge({
        liked: gonnaLike,
        like: v.get('like') + (gonnaLike ? 1 : -1)
      });
    });

    if(state.get('view')=='like' && !gonnaLike){
      newList = newList.filter(v => v.get('id') != action.payload.id);
    }

    return state.merge({
      liked: newLiked,
      list: newList
    });
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
    //message.success('create new color successfully!');
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
  list: [],
  myPortfolio: [],
  myLiked: [],
  liked: {
    'z': 0
  },
  loading: true,
  view: null  // portfolio | like | popular | latest
}));

export default color;
