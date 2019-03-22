import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';

class App extends React.PureComponent {

  render() {
    return <Layout>
      { this.props.children }
    </Layout>
  }
}

export default App;