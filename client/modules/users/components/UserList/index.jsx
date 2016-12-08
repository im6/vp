import React, { PropTypes } from 'react';
import { Card } from 'antd';
import UserItem from '../UserItem';

const UserList = ({ users }) => <Card title="Users List" extra={<a href="#">More</a>} style={{ width: 300 }}>
  <ul>
  {users.map((v, k) => {
    return <li key={k}><UserItem user={v} /></li>
  })}
  </ul>
</Card>;

export default UserList;
