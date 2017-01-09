/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const color = handleActions({
  ['color/getLatest'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true,
      type: 'latest',
      list: []
    });
  },

  ['color/getPortfolio'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true,
      type: 'portfolio'
    });
  },

  ['color/getLike'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true,
      type: 'like'
    });
  },
  ['color/get'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true,
      list: []
    });
  },
  ['color/get/success'](state, action) {
    console.log('loading color success!');
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
  ['color/loadMore'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true
    });
  },
  ['color/loadMore/success'](state, action) {
    console.log('loading color success!');
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
      newLiked = state.get('liked').push(action.payload.id);
    }else{
      newLiked = state.get('liked').filter(v => {
        return v !== action.payload.id;
      });
    }

    let newList = state.get('list').update(action.payload.index, function(v){
      return v.merge({
        liked: gonnaLike,
        like: v.get('like') + (gonnaLike ? 1 : -1)
      });
    });

    if(state.get('type')=='like' && !gonnaLike){
      newList = newList.filter(v => v.get('id') != action.payload.id);
    }

    return state.merge({
      liked: newLiked,
      list: newList
    });
  },

  ['color/initLike'](state, action) {
    let saved = action.payload.like;
    return state.merge({
      liked: saved || []
    });
  },

  ['color/addNew/success'](state, action) {
    message.success('create new color successfully!');
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
  liked: [],
  loading: true,
  type: null
}));

export default color;
