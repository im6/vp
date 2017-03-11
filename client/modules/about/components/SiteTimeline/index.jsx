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
        <Timeline.Item>2016-12-02 Start building </Timeline.Item>
        <Timeline.Item>2016-12-10 Add image extraction</Timeline.Item>
        <Timeline.Item>2017-01-03 Publish v.0.0.1 </Timeline.Item>
        <Timeline.Item>2017-01-15 Release v.0.1</Timeline.Item>
        <Timeline.Item>2017-03-11 Release v.0.2</Timeline.Item>
      </Timeline>
    </div>
  }
}

export default SiteTimeline;