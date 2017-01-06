import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button, Dropdown } from 'antd';
import MenuButton from './components/MenuButton';
import { Link } from 'react-router';
import style from './style.less';

const HeaderCenter = ({logout, userInfo, isNavBtnActive, currentPath}) => {
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

      <Col lg={19} md={14} sm={18} xs={24} className={style.leftHeaderContainer}>

        <MenuButton isNavBtnActive={isNavBtnActive}/>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        {
          currentPath === '/new'?
          <Link to="/">
          <Button type="primary" icon="home">
          Back home
          </Button>
          </Link> :
          <Link to="/new">
            <Button type="primary" icon="plus">
              &nbsp;&nbsp;New Color
            </Button>
          </Link>
        }

        &nbsp;&nbsp;&nbsp;
        { userInfo.get('isAuth') ?
          <Dropdown overlay={profileMenu}>
            <img src={userInfo.get('detail').get('img')} alt="icon"/>
          </Dropdown>
          :
          <Link to="/auth">
            <Button type="default" icon="user">
              Sign In
            </Button>
          </Link>
        }

      </Col>


      <Col lg={5} md={7} sm={6} xs={0}>
        <div className={style.shareBtnGroup}>
          <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=118&layout=button_count&action=like&size=small&show_faces=true&share=true&height=46&appId=1602309996451051"
                  width="146"
                  height="46"
                  style={{border:"none", overflow:"hidden"}}
                  scrolling="no"
                  frameBorder="0"
                  allowTransparency="true" />
        </div>
      </Col>

    </Row>
  </header>;
};

export default HeaderCenter;
