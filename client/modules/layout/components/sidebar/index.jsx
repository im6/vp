import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;

const Sidebar = React.createClass({
  getInitialState() {
    return {
      current: '1',
      openKeys: [],
    };
  },
  handleClick(e) {
    this.setState({ current: e.key });
  },
  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  },
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  },
  render() {
    return (
        <Menu mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={[this.state.current]}
              style={{ width: '85%' }}
              onOpenChange={this.onOpenChange}
              onClick={this.handleClick}>
          <Menu.Item key="home">
            <Link to="/">
              <h3>
                <Icon type="home" />Home
              </h3>
            </Link>
          </Menu.Item>

          <Menu.Item key="product">
            <Link to="/product">
              <h3>
                <Icon type="windows-o" />Product
              </h3>
            </Link>
          </Menu.Item>

          <Menu.Item key="opt">
            <Link to="/optimization">
              <h3>
                <Icon type="eye" />Optimization
              </h3>
            </Link>
          </Menu.Item>

          <SubMenu title={<h3><Icon type="save" />Saved</h3>}>
            <Menu.Item key="setting:1">
              <Link to="/users">
                <h4>
                  history 1
                </h4>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <h4>
                history 2
              </h4>
            </Menu.Item>
          </SubMenu>

          <SubMenu title={<h3><Icon type="user" />User</h3>}>
            <Menu.Item key="setting:1">
              <Link to="/users">
                <h4>
                  <Icon type="team" />
                  Admin
                </h4>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <h4>
                <Icon type="setting" />
                Profile
              </h4>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="support">
            <Link to="/support">
              <h3>
                <Icon type="code" />Support
              </h3>
            </Link>
          </Menu.Item>

        </Menu>
    );
  }
});

export default Sidebar;