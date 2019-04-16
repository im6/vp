import React, {Fragment} from 'react';
import { Route, Switch } from "react-router-dom";
import { createAction } from 'redux-actions';
import Color from '../modules/color';
import OneColor from '../modules/onecolor';
import About from '../modules/about';
import New from '../modules/newcolor';

class Routes extends React.Component {
  constructor(props){
    super(props)
    const { dispatch } = this.props;
    const ac = createAction('color/get');
    dispatch(ac());
  }
  render(){
    return <Switch>
      <Route exact path="/" component={Color} />
      <Route path="/popular" component={Color} />
      <Route path="/color/:id" render={({ match: { params: { id }}}) => {
        return <Fragment>
          <OneColor />
          <Color />
        </Fragment> 
      }} />
      <Route path="/about" component={About} />
      <Route path="/new" component={New} />
    </Switch>
  }
}

export default Routes;