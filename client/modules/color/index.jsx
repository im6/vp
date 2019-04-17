import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Color from './components/Color';

const shared = {};
const mapStateToProps = ({ color }, { location: { pathname }, history }) => {
  const view = color.get('view');
  const colorDef = color.get('colorDef');
  const liked = color.get('liked');
  shared.history = history;
  const list = color.get(pathname === '/popular' ? 'colorIdByLike' : 'colorId');
  return {
    loading: color.get('loading'),
    list,
    colorDef,
    liked,
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
