import React, { PropTypes } from 'react';
import { Timeline } from 'antd';

import style from './style.less';

class SiteTimeline extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
  }

  render() {
    const me = this;

    return <div className={style.container}>
      <Timeline>
        <Timeline.Item>2016-12-01 Come up with an idea </Timeline.Item>
        <Timeline.Item>2016-12-02 Start building </Timeline.Item>
        <Timeline.Item>2017-01-03 Got colorpk.com domain </Timeline.Item>
        <Timeline.Item>2017-01-08 Start providing API support</Timeline.Item>
        <Timeline.Item>2017-01-15 Version 0.1 release</Timeline.Item>
      </Timeline>
    </div>
  }
}

export default SiteTimeline;