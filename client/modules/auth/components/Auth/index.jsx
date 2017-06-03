import React from 'react';
import QueueAnim from 'rc-queue-anim';
import style from './style.less';
import LoginCard from '../LoginCard';

class Auth extends React.Component {
  loginClickHandler(ev){
    const me = this;
    ev.preventDefault();
    me.props.onLogin();
  }

  goBack(){
    const me = this;
    me.props.goBack();
  }

  fbClickHandler(){
    const me = this;
    me.props.onFB(me.props.user.get('facebookUrl'));
  }

  wbClickHandler(){
    const me = this;
    me.props.onWB(me.props.user.get('weiboUrl'));
  }
  ggClickHandler(){
    const me = this;
    me.props.onGG(me.props.user.get('googleUrl'));
  }

  render(){
    const me = this;
    return (<div className={style.authContainer}>
      <div className={style.canvansContainer} />
      <QueueAnim delay={[100 ,0]}
                 type={'bottom'}
                 ease={'easeOutQuart'} >
        <div key="a">
          <LoginCard onLogin={me.loginClickHandler.bind(me)}
                     goBack={me.goBack.bind(me)}
                     fbClick={me.fbClickHandler.bind(me)}
                     ggClick={me.ggClickHandler.bind(me)}
                     wbClick={me.wbClickHandler.bind(me)}/>
        </div>
      </QueueAnim>
    </div>);
  }
}

export default Auth;
