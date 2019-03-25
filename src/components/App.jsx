import React from 'react';
import PropTypes from 'prop-types';
import routes from '../routes'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'

function App() {
  return <div>
    <Link to="/">Popular</Link>
    <Link to="/latest">Latest</Link>
    <Link to="/about">About2</Link>
    <Switch>
      {
        routes.map(r => <Route key={r.path} {...r} />) 
      }
    </Switch> 
  </div> 
}

export default App;