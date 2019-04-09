import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.props.url]}
        mode="horizontal"
      >
        <Menu.Item key="/popular">
          <Link to="/popular">
            <Icon type="rise" />
            Popular
          </Link>
        </Menu.Item>
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="clock-circle" />
            Latest
          </Link>
        </Menu.Item>
        <Menu.Item key="/about">
          <Link to="/about">
            <Icon type="user" />
            About
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;