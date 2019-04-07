import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: 'Latest',
    }
  }

  handleClick(e) {
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="Popular">
          <Link to="/popular">
            <Icon type="rise" />
            Popular
          </Link>
        </Menu.Item>
        <Menu.Item key="Latest">
          <Link to="/">
            <Icon type="clock-circle" />
            Latest
          </Link>
        </Menu.Item>
        <Menu.Item key="About">
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