//https://www.iconfinder.com/icons/762279/communication_connection_media_message_social_talk_weibo_icon#size=128
import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import styles from './style.less'
import {Row,Col, Input, Form, Button, Checkbox, Card, Icon, Tooltip} from 'antd';
import { browserHistory } from 'react-router';

import img from './assets/icon.png';
import imgo1 from './assets/oauth1.png';
import imgo2 from './assets/oauth2.png';

const FormItem = Form.Item;


let LoginCard = ({form, onClickLogin, weiboUrl}) => {
  const {getFieldProps, getFieldsValue, getFieldDecorator} = form;

  const weiboLogin = ()=>{
    const client_id = "806813820",
      redirect_uri = "http://127.0.0.1:4000/api/weibologin",
      state = "9cea2e9021e86796b74cc",
      scope = "email";

    let url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + client_id +
      "&scope=" + scope +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri;

    window.location = weiboUrl;
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    let payload = getFieldsValue();
    onClickLogin(payload)
  };

  const disableBtn = !weiboUrl;
  return (
    <Card title="Welcome to xXX" style={{ width: 270 }}>
      <img src={img} className={styles.iconStyle}/>
      <Form horizontal onSubmit={onSubmit}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}

          <div style={{float:'right'}}>
            <Tooltip title="Weibo">
              <img src={imgo1}
                   onClick={weiboLogin}
                   className={styles.oauthStyle}/>
            </Tooltip>
            <Tooltip title="Facebook">
              <img src={imgo2} className={styles.oauthStyle}/>
            </Tooltip>
          </div>
        </FormItem>



        <Button type="default" htmlType="submit" style={{width: '100%'}}>
          Login
        </Button>






      </Form>
    </Card>
  );
};

LoginCard = Form.create()(LoginCard);

export default LoginCard;
