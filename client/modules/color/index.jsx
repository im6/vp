import React from 'react';
import { Card, Icon, Steps } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import BoxList from './components/BoxList'


class Color extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return <BoxList />
  }
}

export default Color;