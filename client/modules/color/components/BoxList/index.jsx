import React from 'react';
import { Card, Icon, Steps } from 'antd';
import classnames from 'classnames';
import style from './style.less';
import QueueAnim from 'rc-queue-anim';
import Box from './components/Box'


class BoxList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return <QueueAnim type="bottom"
                      delay={300}
                      className={classnames(style.list)}>
      <Box key="1"/>
      <Box key="2"/>
      <Box key="3"/>
      <Box key="4"/>
      <Box key="5"/>
      <Box key="6"/>
      <Box key="7"/>

    </QueueAnim>
  }
}

export default BoxList;