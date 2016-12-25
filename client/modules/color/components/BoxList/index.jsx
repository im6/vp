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
                      delay={300}
                      className={classnames(style.list)}>
      { me.createBoxes()}
      { me.props.loading ?
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