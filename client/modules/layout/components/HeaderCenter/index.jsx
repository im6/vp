import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Tooltip } from 'antd';
import { Link } from 'react-router';
import style from './style.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;


const HeaderCenter = ({logout}) => {
  const isAuth = true;
  const clickHandler = (e) => {
    e.preventDefault();
    logout();
  };

  return <header className={style.header}>
    <Row>
      <Col lg={2} md={2} sm={3} xs={3}>
        <Menu mode="horizontal" style={{zIndex: 2}}>
          <SubMenu title={<h1><Icon type="bars" /></h1>}>
            <Menu.Item key="order1">
              <Icon type="line-chart" />
              Popular
            </Menu.Item>
            <Menu.Item key="order2">
              <Icon type="appstore" />
              Latest
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="about">
              <Icon type="info-circle" />
              About
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>


      <Col lg={3} md={3} sm={4} xs={4}>
        <Link to="/">
          <h1 className={style.title}>
            Color<span>phant</span>
          </h1>
        </Link>
      </Col>

      <Col lg={15} md={13} sm={9} xs={7}/>

      <Col lg={4} md={6} sm={8} xs={10}>
        { isAuth ?
        <div className={style.btnGroup}>

          <Tooltip title="郭子剑" placement="bottom">
            <img src="http://tva4.sinaimg.cn/crop.0.0.180.180.50/4a377f76jw1e8qgp5bmzyj2050050aa8.jpg" alt=""/>
          </Tooltip>
          <ButtonGroup>
            <Tooltip title="Create" placement="bottom">
              <Link to="/new">
                <Button type="primary" icon="plus"/>
              </Link>

            </Tooltip>
            <Tooltip title="Like" placement="bottom">
              <Button type="default" icon="heart"/>
            </Tooltip>
            <Tooltip title="Mine" placement="bottom">
              <Button type="default" icon="book" />
            </Tooltip>
            <Tooltip title="logout" placement="bottom">
              <Button type="default" icon="logout"/>
            </Tooltip>
          </ButtonGroup>
        </div> :
          <div className={style.btnGroup}>
            <Button type="primary" icon="plus">
              Create
            </Button>
            &nbsp;
            &nbsp;
            <Button type="default">
              <i className="fa fa-user"/>
              &nbsp;&nbsp;Login
            </Button>
          </div>
        }


      </Col>
    </Row>












  </header>;
};

export default HeaderCenter;
