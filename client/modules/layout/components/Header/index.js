import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, { location }) => {
  const { pathname } = location;
  return {
    url: pathname
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout() {
      const ac = createAction('user/logoff');
      dispatch(ac());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));