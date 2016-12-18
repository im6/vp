import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import ReactDipper from 'react-dipper';
import styles from './style.less'
import {Row,Col, Input, Form, Button, Checkbox, Card, Icon, Tooltip} from 'antd';
import { browserHistory } from 'react-router';

import img from './assets/icon.png';

const FormItem = Form.Item;


let LoginCard = ({form, onClickLogin}) => {
  const {getFieldProps, getFieldsValue, getFieldDecorator} = form;

  const weiboLogin = ()=>{
    const client_id = "806813820",
      redirect_uri = "http://127.0.0.1:4000",
      state = "9cea2e9021e86796b74cc",
      scope = "email";

    let url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + client_id +
      "&scope=" + scope +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri;

    window.location = url;
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    let payload = getFieldsValue();
    onClickLogin(payload)
  };

  return (
    <Card title="Welcome to Vaporeon" style={{ width: 270 }}>
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
        </FormItem>

        <Row>
          <Col span={11}>
            <Button type="default" htmlType="submit" style={{height: 38, width: '100%'}}>
              Login
            </Button>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Tooltip title="Weibo Login">
              <Button type="default"  onClick={weiboLogin} style={{height: 38, width: '100%'}}>
                <i className="fa fa-weibo fa-2x"></i>
              </Button>
            </Tooltip>
          </Col>
        </Row>

      </Form>
    </Card>
  );
};

LoginCard = Form.create()(LoginCard);

export default LoginCard;
