import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Color from './components/Color';

const shared = {};
const mapStateToProps = ({ color }, { location: { pathname }, history }) => {
  const view = color.get('view');
  shared.history = history;
  let list = color.get('list');
  if(pathname === '/popular') {
    list = color.get('list').sort((a, b) => {
      return b.get('like') - a.get('like');
    })
  }
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
      shared.history.push(`/color/${color.get('id')}`);
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Color));
