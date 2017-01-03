import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

import style from './style.less'
import {Row,Col, Input, Form, Button, Checkbox, Card, Icon, Tooltip} from 'antd';
import { browserHistory } from 'react-router';

import LoginCard from './components/LoginCard';

class Auth extends React.Component {
  constructor(prop) {
    super(prop);
    let me = this;
    me.state = {
      isloging: false
    };
  }

  loginClickHandler(d){
    let me = this;
    me.setState({
      isloging: true
    });

    const dispatch = me.props.dispatch;
    let actionCreater = createAction('auth/login');
    let action = actionCreater(d);
    dispatch(action);

    setTimeout(function(){
      browserHistory.push('/');
    }, 0);
  }

  fbClickHandler(){
    let me = this;
    window.location = me.props.user.get('facebookUrl');
  }

  wbClickHandler(){
    let me = this;
    window.location = me.props.user.get('weiboUrl');
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
