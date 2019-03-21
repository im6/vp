import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/index.jsx';
import QueueAnim from 'rc-queue-anim';
import { default as appService } from './service';

class App extends React.Component {
  constructor(prop){
    super(prop);
  }

  render(){
    return (<Layout>
      { this.props.children}
    </Layout>);
  }
}

export default App;