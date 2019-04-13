import React from 'react';
import { Route, Switch } from "react-router-dom";
import { createAction } from 'redux-actions';
import Color from '../modules/color';
import About from '../modules/about';
import New from '../modules/newcolor';
import Auth from '../modules/auth';

class Routes extends React.Component {
  constructor(props){
    super(props)
    const { dispatch } = this.props;
    const ac = createAction('color/get');
    dispatch(ac());
  }
  render(){
    return <Switch>
      <Route exact path="/" render={Color} />
      <Route path="/popular" component={Color} />
      <Route path="/about" component={About} />
      <Route path="/new" component={New} />
      <Route path="/auth" component={Auth} />
    </Switch>
  }
}

export default Routes;