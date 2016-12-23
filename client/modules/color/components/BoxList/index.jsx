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
      num: 8,
      loading: false
    };

    document.addEventListener('scroll', function(ev){
      if(me.state.loading){
        return;
      }
      let elem = ev.currentTarget.scrollingElement;
      let result = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);
      me.addNewElement(result);
    })
  }
  addNewElement(result){
    let me = this;
    if(result > 0.96){
      me.setState({
        loading: true
      });

      setTimeout(function(){
        me.setState({
          num: me.state.num + 8
        });
      },700);

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
                      className={classnames(style.list)}>
      { me.createBoxes()}
      { me.state.loading ?
        <Col xs={24}
             sm={24}
             md={24}
             lg={24}
             className={style.spinContainer}>
          <SpinLoader />
        </Col> : null
      }

      </QueueAnim>
  }
}

export default BoxList;