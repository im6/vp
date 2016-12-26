import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import QueueAnim from 'rc-queue-anim';
import Box from './components/Box';

class BoxList extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  shouldComponentUpdate(nextProps, nextState){
    let me = this;
    let same = nextProps.list.size === me.props.list.size;
    return !same;
  }

  createBoxes(){
    let me = this;
    let result = [];
    me.props.list.forEach((v, k) => {
      result.push(<Col xs={12}
                       sm={12}
                       md={8}
                       lg={6}
                       key={k}
                       className={style.colContainer}>
        <Box boxInfo={v}/>
      </Col>);
    });
    return result;
  }

  render() {
    let me = this;
    return <QueueAnim type="top"
                      appear={false}
                      duration={350}
                      interval={90}
                      className={classnames(style.list)}>
      { me.createBoxes()}
      </QueueAnim>
  }
}

export default BoxList;