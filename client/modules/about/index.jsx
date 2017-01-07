import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { browserHistory } from 'react-router';
import { Row, Col, Card, Button, Input, Checkbox, Icon, Select, message } from 'antd';

import style from './style.less';

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {

    };
  }

  render() {
    const me = this;

    return <Card title={<span><Icon type="info-circle" />About ColorPK</span>}>
      sth about colorPK.com
    </Card>
  }
}

export default About;