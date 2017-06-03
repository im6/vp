import React from 'react';
import { Timeline } from 'antd';
import style from './style.less';

const SiteTimeline = () => (<Timeline>
  <Timeline.Item>2016-12-02 Start building </Timeline.Item>
  <Timeline.Item>2016-12-10 Add image extraction</Timeline.Item>
  <Timeline.Item>2017-01-03 Publish v.0.0.1 </Timeline.Item>
  <Timeline.Item>2017-01-15 Release v.0.1</Timeline.Item>
  <Timeline.Item>2017-03-11 Release v.0.2</Timeline.Item>
  <Timeline.Item>2017-05-07 Release v.0.3</Timeline.Item>
</Timeline>);

export default SiteTimeline;