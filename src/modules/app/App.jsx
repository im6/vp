import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.PureComponent {

  render() {
    return <Layout>
      { this.props.children }
    </Layout>
  }
}

export default App;