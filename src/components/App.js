import React from 'react';
import PropTypes from 'prop-types';
import routes from '../routes'
import { Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  render(){
    return <div>
      <Link to="/">Popular</Link>
      <Link to="/latest">Latest</Link>
      <Link to="/about">About</Link>
      <Switch>
        {
          routes.map(r => <Route key={r.path} {...r} />) 
        }
      </Switch>
    </div>
  }
}

export default App;