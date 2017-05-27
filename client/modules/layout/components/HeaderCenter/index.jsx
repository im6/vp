import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Menu, Icon, Button, Dropdown } from 'antd';

import MenuButton from './components/MenuButton';
import ProfileMenu from './components/ProfileMenu';

import { Link } from 'react-router';
import style from './style.less';

const hideReturn = [
  'popular',
  'latest',
  'color'
];

const HeaderCenter = ({logout, userInfo, isNavBtnActive, currentView}) => {
  const isAdmin = userInfo.get('detail') && userInfo.get('detail').get('isAdmin');

  let profileMenu = userInfo.get('isAuth') ?
    <ProfileMenu
      onClick={logout}
      username={userInfo.get('detail').get('name')} /> : null;

  return <header className={style.header}>
    <Row>
      <Col lg={1} md={1} sm={1} xs={1}>
        <MenuButton isNavBtnActive={isNavBtnActive}/>
      </Col>


      <Col lg={23} md={23} sm={23} xs={23}>
        <div className={style.rightBtns}>
          {
            hideReturn.indexOf(currentView) < 0?
              <Link to="/">
                <Button type="default" icon="home">
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
          &nbsp;&nbsp;&nbsp;
          {
            isAdmin ? <Link to="/adminPanel">
              <Button type="default" icon="setting" />
            </Link> : null

          }
        </div>
      </Col>

    </Row>
  </header>;
};

export default HeaderCenter;
