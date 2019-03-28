import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

import Colors from './Colors';

const mapStateToProps = (state, route) => {
  const { 
    colors, 
    loading
  } = state;
  return {
    colors,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLike(id) {
      const ac = createAction('color/toggleLike');
      dispatch(ac(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Colors);