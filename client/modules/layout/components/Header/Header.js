import React from 'react';
import { ISMOBILE } from '../../../../config/global';
import { Menu, Icon, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.less';
class Header extends React.Component {
  constructor(props){
    super(props)
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onFBClick = this.onFBClick.bind(this);
  }

  onFBClick(){
    this.props.onOAuth(this.props.facebookUrl);
  }
  
  onClickLogin() {
    if(!this.props.authReady){
      this.props.onInitAuth();
    }
  }

  render() {
    const menu = <div className={style.loginBox}>
      <img className={this.props.authReady? '' : style.disableClick}
        src="//dkny.oss-cn-hangzhou.aliyuncs.com/4/fb.png"
        onClick={this.onFBClick}
      />
    </div>
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
            url !== '/auth' &&
            <Dropdown
              overlay={menu}
              onVisibleChange={this.onClickLogin}
              trigger={["click"]}
            >
                <Button icon="user">
                  { ISMOBILE ? null: 'Sign In'}
                </Button>
            </Dropdown>
          }
          
        </div>
      </div>
    );
  }
}

export default Header;