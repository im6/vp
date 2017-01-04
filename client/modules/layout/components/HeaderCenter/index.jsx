import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Dropdown } from 'antd';
import { Link } from 'react-router';
import style from './style.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;


const HeaderCenter = ({logout, userInfo}) => {

  const clickHandler = (e) => {
    e.preventDefault();
    logout();
  };

  let homeMenu = <Menu mode="vertical" style={{zIndex: 2}}>
    <Menu.Item key="order1">
      <Icon type="line-chart" />
      &nbsp;&nbsp;
      Popular
    </Menu.Item>
    <Menu.Item key="order2">
      <Icon type="appstore" />
      &nbsp;&nbsp;
      Latest
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="about">
      <Icon type="info-circle" />
      &nbsp;&nbsp;
      About
    </Menu.Item>
  </Menu>;

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
      <Col lg={2} md={2} sm={3} xs={3}>
        <Dropdown overlay={homeMenu}>
          <h1 style={{fontSize: '2.5em'}}>
            <Icon type="bars" />
          </h1>
        </Dropdown>
      </Col>


      <Col lg={3} md={3} sm={4} xs={4}>
        <Link to="/">
          <h1 className={style.title}>
            <span>Color</span>
            <span>PK</span>
          </h1>
        </Link>
      </Col>

      <Col lg={15} md={13} sm={9} xs={7}/>

      <Col lg={4} md={6} sm={8} xs={10}>

        <div className={style.btnGroup}>

          { userInfo.get('isAuth') ?
            <Dropdown overlay={profileMenu}>
              <img src={userInfo.get('detail').get('img')} alt="icon"/>
            </Dropdown>
            :
            <Link to="/auth">
              <Button type="default" icon="user">
                Log In
              </Button>
            </Link>
          }
          &nbsp;&nbsp;&nbsp;
          <Link to="/new">
            <Button type="primary" icon="plus">
              Create
            </Button>
          </Link>


        </div>

      </Col>
    </Row>

  </header>;
};

export default HeaderCenter;
