import React, { PropTypes } from 'react';
import { Tag } from 'antd';



const UserItem = ({ user }) =>
  <h2>{ user.get('key') + ': ' + user.get('value') }</h2>;

export default UserItem;
