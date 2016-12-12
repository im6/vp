
import React, { PropTypes } from 'react';
import { DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import Layout from '../layout/index.jsx'
import { List, Map } from 'immutable';

import Todos from '../todos';
import Users from '../users';

const App = ({children}) => {

    return (
    <Layout>
      { children }
    </Layout>
  );
};

App.propTypes = {
  //url: PropTypes.string.isRequired,
};


export default connect()(App);
