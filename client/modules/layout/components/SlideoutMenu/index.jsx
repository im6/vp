import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import style from './style.less';

const SubMenu = Menu.SubMenu,
  groupNameMap = {
  'popular':'list',
  'color':'list',
  'latest':'list',
  'resourceapi':'service',
  'new':'service',
  'extract':'service',
  'about':'about'
},
  itemKeyNameMap = {
  'popular':'index',
  'color':'index',
  'latest':'latest',
  'resourceapi':'resourceapi',
  'new':'extract',
  'extract':'extract',
  'about':''
};

class SlideoutMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    let me = this,
      c = me.props.view,
      n = nextProps.view;

    return n != c;
  }

  handleClick(selection){
    let me = this;
    me.props.onClick();
  }

  render() {
    let me = this,
      current = [groupNameMap[me.props.view], itemKeyNameMap[me.props.view]];

    var result = <div className={style.menuContainer}>
      <Menu
        theme="dark"
        onClick={me.handleClick.bind(me)}
        style={{ width: '100%' }}
        selectedKeys={current}
        defaultOpenKeys={current}
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
          <Menu.Item key="extract">
            <Link to="/extract">
              <h3>
                <Icon type="filter" />
                Extraction
              </h3>
            </Link>

          </Menu.Item>
        </SubMenu>
        <Menu.Item key="about">
          <Link to="/about">
            <h3>
              <Icon type="user" />
              About
            </h3>
          </Link>
        </Menu.Item>
      </Menu>
    </div>;

    return result;
  }
}

export default SlideoutMenu;