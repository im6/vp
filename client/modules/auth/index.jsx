import React from 'react';
import { message } from 'antd';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Auth from './components/Auth';

const mapStateToProps = ({user}) => {
  return {
    user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin() {
      message.error('Credential is not correct, will be continue in anonymous mode.', 2.5);
      setTimeout(function(){
        browserHistory.push('/');
      }, 3000);
    },
    onFB(url) {
      window.location = url;
    },
    onWB(url) {
      window.location = url;
    },
    onGG(url) {
      window.location = url;
    },
    goBack() {
      browserHistory.push('/');
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
