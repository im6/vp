import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import { createAction } from 'redux-actions';
import Color from '../modules/color';
import About from '../modules/about';

class Routes extends React.Component {
  render(){
    const { dispatch } = this.props;
    return <Switch>
      <Route exact path="/" render={(r) => {
        const ac = createAction('color/get');
        dispatch(ac());
        return <Color />
      }} />
      <Route path="/popular" component={Color} />
      <Route path="/about" component={About} />
    </Switch>
  }
}

export default Routes;