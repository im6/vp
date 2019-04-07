import React, { Fragment } from 'react';
import { Route } from "react-router-dom";
import Color from '../modules/color';
import About from '../modules/about';

class Routes extends React.Component {
  render(){
    return <Fragment>
      <Route exact path="/" component={Color} />
      <Route path="/latest" component={Color} />
      <Route path="/about" component={About} />
    </Fragment>
  }
}

export default Routes;