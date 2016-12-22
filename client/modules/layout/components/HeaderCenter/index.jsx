import React, { PropTypes } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';
import style from './style.less';
import img from '!file!./assets/wheel.png';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const HeaderCenter = ({logout}) => {
  const clickHandler = (e) => {
    debugger;
    e.preventDefault();
    logout();
  };

  return <header className={style.header}>
    <img src={img} className={style.img}/>

  </header>;
};

export default HeaderCenter;
