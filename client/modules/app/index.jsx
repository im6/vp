
import React, { PropTypes } from 'react';
import { DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import Layout from '../layout/index.jsx'
import { List, Map } from 'immutable';

import Todos from '../todos';
import Users from '../users';

const App = ({location}) => {

  let ele = null;
  let url = location.hash.replace(/#\//, '');

  const fn = (localUrl) => {
    if (localUrl === '') {

      ele = <div>
        <h1>Welcome to index page</h1>
        <DatePicker />
      </div>;

    }
    else if (localUrl == 'todos'){

      ele = <div>
        <Todos />
      </div>;

    } else if(localUrl == 'users'){

      ele = <Users />

    }

    return ele;
  };

  return (
    <Layout>
      { fn(url) }
    </Layout>
  );
};

App.propTypes = {
  //url: PropTypes.string.isRequired,
};


export default connect()(App);
