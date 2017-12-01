/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const SourceMap = {
  "like":"myLiked",
  "portfolio":"myPortfolio",
  "color": "list",
  "popular": "list",
  "latest": "list"
};

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
    message.error('create new color failed! ' + action.payload.code);
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
    let newLiked = null,
      listName = SourceMap[state.get('view')],
      list = state.get(listName),
      selectedId = action.payload.id,
      gonnaLike = action.payload.willLike;

    if(gonnaLike){
      let newMap = {};
      newMap['d'+ selectedId] = true;
      newLiked = state.get('liked').merge(newMap);
    }else{
      newLiked = state.get('liked').delete('d'+ selectedId);
    }

    let index = list.findIndex(v => v.get('id') === selectedId);
    let newList = list.update(index, function(v){
      return v.merge({
        liked: gonnaLike,
        like: v.get('like') + (gonnaLike ? 1 : -1)
      });
    });

    let mgObj = {
      liked: newLiked,
    };

    if(state.get('view') === 'like'){
      if(gonnaLike){
        // no need to update
      }else{
        newList = newList.filter(v => v.get('id') != selectedId);
      }
      mgObj.myLiked = newList;
    } else{
      mgObj[listName] = newList;
    }

    return state.merge(mgObj);
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
  list: [],
  myPortfolio: [],
  myLiked: [],
  liked: {
    'z': 0
  },
  loading: true,
  view: null // portfolio | like | popular | latest
}));

export default color;
