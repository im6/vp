import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = ({user, color},b,c,d) => {
  debugger;
  return {
    user,
    view: color.get('view')
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);