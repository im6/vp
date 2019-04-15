import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Header from './Header';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ user }, { location }) => {
  const { pathname } = location;
  return {
    authReady: user.get('authReady'),
    url: pathname,
    facebookUrl: user.get('facebookUrl'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitAuth() {
      const ac = createAction('user/initAuth');
      dispatch(ac());
    },
    onOAuth(url) {
      const ac = createAction('user/onOAuth');
      dispatch(ac(url));
    },
    onLogout() {
      const ac = createAction('user/logoff');
      dispatch(ac());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));