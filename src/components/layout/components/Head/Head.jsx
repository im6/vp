import React from 'react'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { Link } from "react-router-dom";

class Head extends React.Component {render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="popular">
          <Link to="/popular">
            <Icon type="rise" />
            Popular
          </Link>
        </Menu.Item>
        <Menu.Item key="latest">
          <Link to="/">
            <Icon type="clock-circle" />
            Latest
          </Link>
        </Menu.Item>
        <Menu.Item key="create">
          <Link to="/create">
            <Icon type="plus-square" />
            Create
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Head;
