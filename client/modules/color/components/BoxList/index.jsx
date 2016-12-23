import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
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
      num: 20,
      loading: false
    };

    document.addEventListener('scroll', function(ev){
      let elem = ev.currentTarget.scrollingElement;
      let result = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);
      console.log(result);
    })
  }
  scrollHandler(a, event){
    let me = this;
    if(me.state.loading){
      return;
    }
    let result = a.currentTarget.scrollTop / (a.currentTarget.scrollHeight - a.currentTarget.clientHeight);
    console.log(result);
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
      result.push(<Col xs={12}
                       sm={12}
                       md={8}
                       lg={6}
                       key={i}
                       className={style.colContainer}>
        <Box key={i}/>
      </Col>);
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