import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { browserHistory } from 'react-router';
import { Row, Col, Card, Button, Input, Checkbox, Icon, Alert, message } from 'antd';

import style from './style.less';

class ResourceApi extends React.PureComponent {
  constructor(props) {
    super(props);
    let me = this;
    me.state = {

    };
  }

  render() {
    const me = this;

    return <Card
      className={style.container}
      title={<span><Icon type="hdd" /> &nbsp;&nbsp;&nbsp;API Support</span>}>
      <h3>
        We appreciate opensource, so we are glad to announce that colorPK
        will launch API interface, not only for those who are keen on creating colors idea,
        but also the people who thinking about using our huge mount of color resource
        within their application.
      </h3>
      <div className={style.alertContainer}>
        <br/>
        <br/>
        <br/>
        <Alert
          style={{width: 300}}
          message="Sorry, You are not logged in."
          description="In order to get API access, you have to sign in."
          type="warning"
          showIcon
          />
        <Link to="/auth">
          <Button type="primary" icon="user">Sign In</Button>
        </Link>

      </div>



    </Card>
  }
}

export default ResourceApi;