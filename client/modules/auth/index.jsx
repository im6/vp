import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import ReactDipper from 'react-dipper';

import style from './style.less'
import {Row,Col, Input, Form, Button, Checkbox, Card, Icon, Tooltip} from 'antd';
import { browserHistory } from 'react-router';

import LoginCard from './components/LoginCard';
import Footer from '../layout/components/footer';

class Auth extends React.Component {
  constructor(prop) {
    super(prop);
    let me = this;
    me.state = {
      isloging: false
    };
  }

  onSubmit(d){
    let me = this;
    me.setState({
      isloging: true
    });

    const dispatch = me.props.dispatch;
    debugger;
    let actionCreater = createAction('auth/login');
    let action = actionCreater(d);
    dispatch(action);

    setTimeout(function(){
      browserHistory.push('/');
    }, 0);
  }

  render(){
    let me = this;
    return (<div className={style.authContainer}>

      <div className={style.canvansContainer}>
        <ReactDipper styleParams={{
          'backgroundColor': '#374861'
        }}/>
      </div>

      <QueueAnim delay={[100 ,0]}
                 type={'bottom'}
                 ease={'easeOutQuart'} >
        <div key="a">
          <LoginCard onClickLogin={me.onSubmit.bind(me)} weiboUrl={me.props.auth.get('weiboUrl')}/>
        </div>
      </QueueAnim>
    </div>);
  }
}
function mapStateToProps({auth}){
  return {
    auth
  }
}

export default connect(mapStateToProps)(Auth);
