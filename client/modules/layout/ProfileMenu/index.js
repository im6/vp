import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import style from './style.less';

class ProfileMenu extends Component {
  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout(){
    this.props.onClickLogout();
  }
  render(){
    const {
      username,
    } = this.props;
    return <div className={style.container}>
      <h3>
        {username}
      </h3>
      <hr/>
      <h4>
        <Link to="/portfolio">
          <Icon type="smile-o" />
          &nbsp;&nbsp;
          Portfolio
        </Link>
      </h4>
      <h4>
        <Link to="/like">
          <Icon type="heart-o" />
          &nbsp;&nbsp;
          Like
        </Link>
      </h4>
      <hr/>
      <h4>
        <a onClick={this.onLogout}>
          <Icon type="logout" />
          &nbsp;&nbsp;
          Logout
        </a>
      </h4>
    </div>;
  }
}

export default ProfileMenu;
