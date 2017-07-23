import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const ProfileMenu = ({username, onClick}) => {

  const onClick0 = (ev) => {
    ev.preventDefault();
    onClick();
  };

  return <Menu>
    <Menu.Item>
      <Link to="/">
        {username}
      </Link>
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
      <a onClick={onClick0}>
        <Icon type="logout" />
        &nbsp;&nbsp;
        Logout
      </a>
    </Menu.Item>
  </Menu>;
};

export default ProfileMenu;
