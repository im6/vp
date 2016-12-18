import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';
import { browserHistory } from 'react-router';
import style from './style.less';
import img from '!file!./assets/bird.png';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const logout = () => {
  browserHistory.push('/auth');
};

const Header = () =><header className={style.header}>
  <Row>
    <Col xs={1} sm={1} md={1} lg={1}></Col>

    <Col xs={3} sm={3} md={2} lg={1}>
      <img src={img} className={style.icon}/>
    </Col>

    <Col xs={8} sm={6} md={6} lg={4}>
      <h1 className={style.title}>&nbsp; VAPOREON</h1>
    </Col>

    <Col xs={6} sm={8} md={11} lg={16}></Col>

    <Col xs={5} sm={5} md={3} lg={1}>
      <Button type="primary" icon="logout" style={{'marginTop':13}} onClick={logout}>Logout</Button>
    </Col>

    <Col xs={1} sm={1} md={1} lg={1}></Col>
  </Row>
</header>;

export default Header;
