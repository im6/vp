import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/index.jsx';
import QueueAnim from 'rc-queue-anim';
import { default as appService } from './service';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from '../auth';
import Color from '../color';
import NewColor from '../newcolor';
import About from '../about';
import ResourceApi from '../resourceApi';
import AdminPanel from '../adminPanel';

class App extends React.Component {
  constructor(prop){
    super(prop);
  }

  render(){
    return (<div>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Popular</Link>
            </li>
            <li>
              <Link to="/latest">Latest</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <Route exact path="/" component={Color} />
        <Route path="/latest" component={Color} />
        <Route path="/about" component={About} />
        </div>
       
      </Router>
    </div>);
  }
}

export default App;