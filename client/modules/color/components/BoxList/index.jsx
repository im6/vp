import React from 'react';
import { Card, Icon, Steps } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import QueueAnim from 'rc-queue-anim';
import Box from './components/Box';
import SpinLoader from './components/SpinLoader'

class BoxList extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {
      num: 6,
      loading: false
    };
  }
  scrollHandler(a, event){
    let me = this;
    if(me.state.loading){
      return;
    }
    let result = a.currentTarget.scrollTop / (a.currentTarget.scrollHeight - a.currentTarget.clientHeight);
    if(result > 0.96){
      me.setState({
        loading: true
      });

      setTimeout(function(){
        me.setState({
          num: me.state.num + 6
        });
      },800);

      setTimeout(function(){
        me.setState({
          loading: false
        });
      }, 1500)

    }
  }

  createBoxes(){
    let me = this;
    let result = [];
    for(let i = 0; i < me.state.num; i++){
      result.push(<Box key={i}/>);
    }
    return result;

  }

  render() {
    let me = this;

    return <QueueAnim type="top"
                      delay={300}
                      className={classnames(style.list)}
                      onScroll={me.scrollHandler.bind(me)}>
      { me.createBoxes()}
      { me.state.loading ?
        <div className={style.spinContainer}>
          <SpinLoader />
        </div> : null
      }

      </QueueAnim>
  }
}

export default BoxList;