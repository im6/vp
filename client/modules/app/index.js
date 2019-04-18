import React from 'react';
import PropTypes from 'prop-types';
import { default as appService } from './service';

import Routes from '../../routes';
import Layout from '../layout';

class App extends React.Component {
  constructor(prop){
    super(prop);
  }

  render(){
    return <Layout>
      <Routes dispatch={this.props.dispatch} />
    </Layout>;
  }
}

export default App;