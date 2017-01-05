import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Dropdown, Radio, Tooltip } from 'antd';
import { Link } from 'react-router';
import style from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const HeaderCenter = ({logout, userInfo}) => {

  const clickHandler = (e) => {
    e.preventDefault();
    logout();
  };

  let profileMenu = userInfo.get('isAuth') ? <Menu>
    <Menu.Item>
      {userInfo.get('detail').get('name')}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/portfolio">
        <Icon type="smile-o" />
        &nbsp;&nbsp;
        Portfolio
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/like">
        <Icon type="heart-o" />
        &nbsp;&nbsp;
        Like
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a onClick={clickHandler}>
        <Icon type="logout" />
        &nbsp;&nbsp;
        Logout
      </a>
    </Menu.Item>
  </Menu>: null;



  return <header className={style.header}>
    <Row>

      <Col lg={5} md={7} sm={10} xs={14}>
        <div className={style.navGroup}>
          <RadioGroup defaultValue="popular" size="large">
            <RadioButton value="popular">
              <Tooltip placement="bottom" title="Popular">
                <Icon type="line-chart" />
              </Tooltip>
            </RadioButton>

            <RadioButton value="latest">
              <Tooltip placement="bottom" title="Latest">
                <Icon type="clock-circle-o" />
              </Tooltip>
            </RadioButton>

            <RadioButton value="about">
              <Tooltip placement="bottom" title="About">
                <Icon type="info-circle" />
              </Tooltip>
            </RadioButton>
          </RadioGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          { userInfo.get('isAuth') ?
            <Dropdown overlay={profileMenu}>
              <img src={userInfo.get('detail').get('img')} alt="icon"/>
            </Dropdown>
            :
            <Link to="/auth">
              <Tooltip placement="bottom" title="Log In">
                <Button type="default"
                        size="large">
                  <h4>
                    <Icon type="user" />
                  </h4>
                </Button>
              </Tooltip>
            </Link>
          }
        </div>

      </Col>

      <Col lg={14} md={10} sm={8} xs={10}>

        <div className={style.btnGroup}>

          <Link to="/new">
            <Button type="primary">
              <h3>
                <Icon type="plus" />
                &nbsp;&nbsp;
                New Color
              </h3>
            </Button>
          </Link>
        </div>

      </Col>

      <Col lg={5} md={7} sm={6} xs={0}>
        <div className={style.shareBtnGroup}>
          <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=118&layout=button_count&action=like&size=small&show_faces=true&share=true&height=46&appId=1602309996451051"
                  width="146"
                  height="46"
                  style={{border:"none", overflow:"hidden"}}
                  scrolling="no"
                  frameborder="0"
                  allowTransparency="true" />
        </div>
      </Col>

    </Row>
  </header>;
};

export default HeaderCenter;
