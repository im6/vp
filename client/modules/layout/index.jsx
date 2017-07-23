import React from 'react';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Layout from './components/Layout';

const mapStateToProps = ({color, user}) => {
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
      browserHistory.push('/');
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);