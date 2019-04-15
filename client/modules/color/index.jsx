import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Color from './components/Color';

const shared = {};

const mapStateToProps = ({ color }, { location: { pathname }, history }) => {
  const view = color.get('view');
  shared.history = history;
  let list;
  if(pathname === '/'){
    list = color.get('list');
  } else if(pathname === '/popular') {
    list = color.get('list').sort((a, b) => {
      return b.get('like') - a.get('like');
    })
  }
  // let color0 = color.get(listName).map(v => {
  //   return v.merge({
  //     liked: saved.get('d' + v.get('id')) || false
  //   });
  // });

  // //========== order ==============
  // if (view === 'latest'){
  //   color0 = color0.sortBy(v => {
  //     return v.get('id');
  //   }, (a,b) => b-a);
  // }
  // //========== order END ==============
  return {
    list,
    loading: color.get('loading'),
    view,
    history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike(id, willLike) {
      const ac = createAction('color/toggleLike');
      dispatch(ac({
        willLike,
        id
      }));
    },
    onEnter(color) {
      const ac = createAction('color/download');
      dispatch(ac({
        color: color.get('color'),
        id: color.get('id')
      }));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Color));
