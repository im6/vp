import React, { PropTypes } from 'react';
import { Card } from 'antd';
import TodoList from './components/TodoList';

import { connect } from 'react-redux';


const Todos = ({data, dispatch, isLoading}) => {

  const fn1 = ()=>{
    dispatch({
      type:'todos/get',
      payload:{
        test:"get some todos"
      }
    })
  };

  return <TodoList todos={data} getTodoList={fn1} isLoading={isLoading}/>
};

function mapStateToProps({todos, routing}){
  return {
    data: todos.get('todoList'),
    isLoading: todos.get('loading')
  }
}

export default connect(mapStateToProps)(Todos);
