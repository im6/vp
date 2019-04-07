import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import Color from '../modules/color';
import About from '../modules/about';

class Routes extends React.Component {
  render(){
    return <Switch>
      <Route exact path="/" component={Color} />
      <Route path="/popular" component={Color} />
      <Route path="/about" component={About} />
    </Switch>
  }
}

export default Routes;