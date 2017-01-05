import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

import style from './style.less'
import {Row,Col, message, Card, Icon } from 'antd';
import { browserHistory } from 'react-router';

import LoginCard from './components/LoginCard';

class Auth extends React.Component {
  constructor(prop) {
    super(prop);
    let me = this;
  }

  loginClickHandler(ev){
    let me = this;
    ev.preventDefault();
    message.error('Credential is not correct, will be continue in anonymous mode.', 2.5);

    setTimeout(function(){
      browserHistory.push('/');
    }, 3000);
  }

  fbClickHandler(){
    let me = this;
    window.location = me.props.user.get('facebookUrl');
  }

  wbClickHandler(){
    let me = this;
    window.location = me.props.user.get('weiboUrl');
  }
  ggClickHandler(){
    let me = this;
    window.location = me.props.user.get('googleUrl');
  }

  render(){
    let me = this;
    return (<div className={style.authContainer}>

      <div className={style.canvansContainer}>
      </div>

      <QueueAnim delay={[100 ,0]}
                 type={'bottom'}
                 ease={'easeOutQuart'} >
        <div key="a">
          <LoginCard loginClick={me.loginClickHandler.bind(me)}
                     fbClick={me.fbClickHandler.bind(me)}
                     ggClick={me.ggClickHandler.bind(me)}
                     wbClick={me.wbClickHandler.bind(me)}/>
        </div>
      </QueueAnim>
    </div>);
  }
}
function mapStateToProps({user}){
  return {
    user
  }
}

export default connect(mapStateToProps)(Auth);
