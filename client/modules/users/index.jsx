import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import UserList from './components/UserList';

const Users = ({data}) => <UserList users={data} />

function mapStateToProps({users, routing}){
  return {
    data: users.get('list'),
    isLoading: users.get('loading')
  }
}

export default connect(mapStateToProps)(Users);