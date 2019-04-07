import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import style from './style.less';

const ProfileMenu = ({username, onClick}) => {

  const onClick0 = (ev) => {
    ev.preventDefault();
    onClick();
  };

  return <div className={style.container}>
    <h3>
      {username}
    </h3>
    <hr/>
    <h4>
      <Link to="/portfolio">
        <Icon type="smile-o" />
        &nbsp;&nbsp;
        Portfolio
      </Link>
    </h4>
    <h4>
      <Link to="/like">
        <Icon type="heart-o" />
        &nbsp;&nbsp;
        Like
      </Link>
    </h4>
    <hr/>
    <h4>
      <a onClick={onClick0}>
        <Icon type="logout" />
        &nbsp;&nbsp;
        Logout
      </a>
    </h4>
  </div>;
};

export default ProfileMenu;
