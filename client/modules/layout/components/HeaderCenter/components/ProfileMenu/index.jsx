import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const FBShare = ({username, onClick}) => {

  const onClick0 = (ev) => {
    ev.preventDefault();
    onClick();
  };

  return <Menu>
    <Menu.Item>
      {username}
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

export default FBShare;
