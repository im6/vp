import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Color from './components/Color';

const mapStateToProps = ({ color }, { location: { pathname }}) => {
  const saved = color.get('liked');
  const view = color.get('view');
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike(id, btnStatus) {
      const ac = createAction('color/toggleLike');
      dispatch(ac({
        ...btnStatus,
        id
      }));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Color));
