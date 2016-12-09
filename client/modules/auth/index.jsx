import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDipper from 'react-dipper';
import classnames from 'classnames';
import styles from './style.less';
import {Row,Col, Input, Form, Button, Checkbox, Card, Icon, Tooltip} from 'antd';

import img from './assets/user1.png';

const FormItem = Form.Item;



let Auth = ({auth, form, dispatch}) => {
  const {getFieldProps, getFieldsValue, getFieldDecorator} = form;

  const onSubmit = (e) =>{
    let payload = getFieldsValue();
    e.preventDefault();
    var action = {};
    dispatch(action);
  };

  const weiboLogin = ()=>{
    const client_id = "806813820",
      redirect_uri = "http://127.0.0.1:5000",
      state = "9cea2e9021e86796b74cc",
      scope = "email";

    let url = "https://api.weibo.com/oauth2/authorize?" +
      "client_id=" + client_id +
      "&scope=" + scope +
      "&state=" + state +
      "&redirect_uri=" + redirect_uri;

    window.location = url;
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.canvansContainer}>
        <ReactDipper styleParams={{
          'backgroundColor': '#374861'
        }}/>
      </div>

      <Card title="Welcome" style={{ width: 280 }} className={styles.loginCard}>
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
              <Button type="default" htmlType="submit" style={{'width':'100%', 'height': 36}}>
                Login
              </Button>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Tooltip title="Weibo Login">
                <Button type="default"  onClick={weiboLogin} style={{'width':'100%'}}>
                  <i className="fa fa-weibo fa-2x"></i>
                </Button>
              </Tooltip>
            </Col>
          </Row>







        </Form>
      </Card>




    </div>
  );
};

Auth = Form.create()(Auth);

Auth.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (e) => {

    }
  }
};

function mapStateToProps({auth}, { location }) {
  return {
    auth: auth
  };
}

export default connect(mapStateToProps)(Auth);

