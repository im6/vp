import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import style from './style.less';


class SlideoutMenu extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state={
      current: "1"
    }

  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  handleClick(ev){
    let me = this;

  }

  render() {
    let me = this;
    var result = <div className={style.menuContainer}>

      <Menu
        theme="dark"
        onClick={me.handleClick.bind(me)}
        style={{ width: '100%' }}
        defaultOpenKeys={['list', '1']}
        selectedKeys={[me.state.current]}
        mode="inline"
        >
        <SubMenu key="list" title={<h3><Icon type="home" />Explore</h3>}>
          <Menu.Item key="1">
            <h3>
              <Icon type="line-chart" />
              Popular
            </h3>

          </Menu.Item>
          <Menu.Item key="2">
            <h3>
              <Icon type="clock-circle-o" />
              Latest
            </h3>

          </Menu.Item>
        </SubMenu>
        <SubMenu key="service" title={<h3><Icon type="appstore" />Service</h3>}>
          <Menu.Item key="5">
            <h3>
              <Icon type="hdd" />
              API
            </h3>

          </Menu.Item>
          <Menu.Item key="6">
            <h3>
              <Icon type="filter" />
              Extraction
            </h3>

          </Menu.Item>
        </SubMenu>
        <SubMenu key="about" title={<h3><Icon type="info-circle" />About</h3>}>
          <Menu.Item key="9">
            <h3>
              <Icon type="book" />
              Site
            </h3>

          </Menu.Item>
          <Menu.Item key="10">
            <h3>
              <Icon type="user" />Auther
            </h3>

          </Menu.Item>
        </SubMenu>
      </Menu>

    </div>;


    return result;
  }
}


export default SlideoutMenu;
