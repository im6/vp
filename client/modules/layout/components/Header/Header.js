import React from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.less';
class Header extends React.Component {
  constructor(props){
    super(props)
  }

  handleClick(e) {
  }

  render() {
    return (
      <div className={style.lock}>
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
              <Icon type="info-circle" />
              About
            </Link>
          </Menu.Item>
        </Menu>
        <div className={style.buttonGroup}>
          <Link to="/new">
            <Button type="primary" icon="plus">New Color</Button>
          </Link>
          &nbsp;&nbsp;
          <Link to="/auth">
            <Button type="default" icon="user">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;