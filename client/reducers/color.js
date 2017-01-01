/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';

const color = handleActions({
  ['color/get'](state, action) {
    console.log('loading color...');
    return state.merge({
      loading: true
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

    return state.merge({
      liked: newLiked,
      list: newList
    });
  },

  ['color/initLike'](state, action) {

    let saved = action.payload.like;
    if(saved){
      let newList = state.get('list').map(function(v) {
        return v.merge({
          liked: saved.indexOf(v.get('id')) > -1
        });
      });
      return state.merge({
        liked: saved,
        list: newList
      });
    } else {
      return state;
    }

  },
}, Immutable.fromJS({
  list: [],
  liked: [],
  loading: true,
}));

export default color;
