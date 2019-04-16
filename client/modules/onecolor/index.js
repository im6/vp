import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import OneColor from './OneColor';

const mapStateToProps = ({ color }, { match: { params: { id }} }) => {
  let selected = null;
  if (color.get('list').size > 0) {
    selected = color.get('list').find(v => v.get('id') === parseInt(id));
  }
  return {
    selected,
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
    onDownload(color) {
      const ac = createAction('color/download');
      dispatch(ac({
        color: color.get('color'),
        id: color.get('id')
      }));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OneColor));
