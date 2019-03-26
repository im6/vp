import React from 'react';
import PropTypes from 'prop-types';
import { Button, DatePicker } from 'antd';
function onChange(date, dateString) {
  console.log(date, dateString);
}

class Home extends React.PureComponent {

  render() {
    return <div>
      <h1>This is home view</h1>
      <Button>Click me</Button>
      <DatePicker onChange={onChange} />
    </div>
  }
}

export default Home;