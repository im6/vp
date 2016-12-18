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