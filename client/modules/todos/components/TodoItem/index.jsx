import React, { PropTypes } from 'react';
import { Tag } from 'antd';



const TodoItem = ({ todo }) =>
  <Tag color="#87d068">{ todo.get('key') + ': ' + todo.get('value') }</Tag>;

export default TodoItem;
