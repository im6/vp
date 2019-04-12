import React from 'react';
import { ISMOBILE } from '../../../../config/global';
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
    const { url } = this.props;
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
          {
            !ISMOBILE && <Menu.Item key="/about">
              <Link to="/about">
                <Icon type="info-circle" />
                About
              </Link>
            </Menu.Item>
          }
          
        </Menu>
        <div className={style.buttonGroup}>
          {
            url !== '/new' && <Link to="/new">
              <Button type="primary" icon="plus">
                { ISMOBILE ? null: 'New Color'}
              </Button>
            </Link>
          }
          &nbsp;&nbsp;
          {
            url !== '/auth' && <Link to="/auth">
              <Button type="default" icon="user">
                { ISMOBILE ? null: 'Sign In'}
              </Button>
            </Link>
          }
          
        </div>
      </div>
    );
  }
}

export default Header;