import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Tooltip } from 'antd';
import { Link } from 'react-router';
import style from './style.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ButtonGroup = Button.Group;


const HeaderCenter = ({logout, userInfo}) => {
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
            <span>color</span>phant
          </h1>
        </Link>
      </Col>

      <Col lg={15} md={13} sm={9} xs={7}/>

      <Col lg={4} md={6} sm={8} xs={10}>
        { userInfo.get('isAuth') ?
        <div className={style.btnGroup}>

          <Tooltip title={userInfo.get('detail').get('name')} placement="bottom">
            <img src={userInfo.get('detail').get('profile_image_url')} alt="icon"/>
          </Tooltip>
          <ButtonGroup>
            <Tooltip title="Create" placement="bottom">
              <Link to="/new">
                <Button type="primary" icon="plus"/>
              </Link>

            </Tooltip>
            <Tooltip title="Like" placement="bottom">
              <Link to="/like">
                <Button type="default" icon="heart"/>
              </Link>
            </Tooltip>

            <Tooltip title="Portfolio" placement="bottom">
              <Link to="/portfolio">
                <Button type="default" icon="smile-o" />
              </Link>
            </Tooltip>

            <Tooltip title="logout" placement="bottom">
              <Button type="default"
                      onClick={clickHandler}
                      icon="logout"/>
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
