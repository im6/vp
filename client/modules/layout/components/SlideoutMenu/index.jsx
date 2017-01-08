import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';

import {Global} from '../../../../config/global.js';
const SubMenu = Menu.SubMenu;

import style from './style.less';


const groupNameMap = {
  '/':'list',
  '/latest':'list',
  '/resourceapi':'service',
  '/new':'service',
  '/about':'about'
};
const itemKeyNameMap = {
  '/':'index',
  '/latest':'latest',
  '/resourceapi':'resourceapi',
  '/new':'new',
  '/about':'about'
};

class SlideoutMenu extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
    me.state={
      current: [groupNameMap[me.props.currentPath], itemKeyNameMap[me.props.currentPath]]
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }
  handleClick(selection){
    let me = this;

    if(selection.key != 'zj'){
      me.setState({
        current: selection.keyPath
      });
      me.props.onClick(selection);
    }

  }

  render() {
    let me = this;
    var result = <div className={style.menuContainer}>
      <Menu
        theme="dark"
        onClick={me.handleClick.bind(me)}
        style={{ width: '100%' }}
        selectedKeys={me.state.current}
        defaultOpenKeys={me.state.current}
        mode="inline"
        >
        <SubMenu key="list" title={<h3><Icon type="home" />ColorPK.com</h3>}>
          <Menu.Item key="index">
            <Link to="/">
              <h3>
                <Icon type="line-chart" />
                Popular
              </h3>
            </Link>

          </Menu.Item>
          <Menu.Item key="latest">
            <Link to="/latest">
              <h3>
                <Icon type="clock-circle-o" />
                Latest
              </h3>
            </Link>

          </Menu.Item>
        </SubMenu>
        <SubMenu key="service" title={<h3><Icon type="appstore" />Service</h3>}>
          <Menu.Item key="resourceapi">
            <Link to="/resourceapi">
              <h3>
                <Icon type="hdd" />
                API
              </h3>
            </Link>
          </Menu.Item>
          <Menu.Item key="new">
            <Link to="/new">
              <h3>
                <Icon type="filter" />
                Extraction
              </h3>
            </Link>

          </Menu.Item>
        </SubMenu>
        <SubMenu key="about" title={<h3><Icon type="info-circle" />About</h3>}>
          <Menu.Item key="about">
            <Link to="/about">
              <h3>
                <Icon type="book" />
                Site
              </h3>
            </Link>

          </Menu.Item>
          <Menu.Item key="zj">
            <a href={Global.zjweb} target="_blank">
              <h3>
                <Icon type="user" />Auther
              </h3>
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>;

    return result;
  }
}

function mapStateToProps({routing}){
  return {
    currentPath: routing.locationBeforeTransitions.pathname
  }
}
export default connect(mapStateToProps)(SlideoutMenu) ;
