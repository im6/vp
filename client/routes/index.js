import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";
import { createAction } from 'redux-actions';
import Color from '../modules/color';
import SpinLoader from '../modules/color/components/SpinLoader';

const AsyncAdminPanel = Loadable({
  loader: () => import(/* webpackChunkName: "adminPanel" */'../modules/adminPanel'),
  loading: SpinLoader,
});
const AsyncNewColor = Loadable({
  loader: () => import(/* webpackChunkName: "newColor" */'../modules/newcolor'),
  loading: SpinLoader,
});

class Routes extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props;
    const ac0 = createAction('color/get');
    dispatch(ac0());

    const ac1 = createAction('user/auth');
    dispatch(ac1());
  }

  render(){
    return <Switch>
      <Route exact path="/" component={Color} />
      <Route path="/latest" component={Color} />
      <Route path="/popular" component={Color} />
      <Route path="/color/:id" component={Color} />
      <Route path="/like" component={Color} />
      <Route path="/portfolio" component={Color} />
      <Route path="/new" component={AsyncNewColor} />
      <Route path="/adminpanel" component={AsyncAdminPanel} />
    </Switch>
  }
}

export default Routes;
