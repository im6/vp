import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, Button, Alert, Icon } from 'antd';
import style from './style.less';

const ResourceApi = () => {
  return (<Card
    className={style.container}
    style={{height: window.innerHeight * 0.8}}
    title={<span><Icon type="hdd" /> &nbsp;&nbsp;&nbsp;API Support</span>}>
    <h3>
      We appreciate OpenSource, so we are glad to announce that colorPK
      will launch API interface, not only for those who are keen on creating colors idea,
      but also for the people who are thinking about leveraging our huge mount of color resource
      for their application.
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
  </Card>);
};

export default ResourceApi;