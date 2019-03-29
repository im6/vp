import React from 'react';
import PropTypes from 'prop-types';
import routes from '../routes'
import Head from './Head';
import { Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  render(){
    return <div>
      <Head />
      <Switch>
        {
          routes.map(r => <Route key={r.path} {...r} />) 
        }
      </Switch>
    </div>
  }
}

export default App;