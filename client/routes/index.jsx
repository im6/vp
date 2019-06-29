import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createAction } from 'redux-actions';
import Color from '../modules/color';
import SpinLoader from '../modules/color/components/SpinLoader';

const AsyncAdminPanel = lazy(() =>
  import(/* webpackChunkName: "adminPanel" */ '../modules/adminPanel')
);
const AsyncNewColor = lazy(() =>
  import(/* webpackChunkName: "newColor" */ '../modules/newcolor')
);

class Routes extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const ac0 = createAction('color/get');
    dispatch(ac0());
    const ac1 = createAction('user/auth');
    dispatch(ac1());
  }

  render() {
    return (
      <Suspense fallback={<SpinLoader />}>
        <Switch>
          <Route exact path="/" component={Color} />
          <Route path="/latest" component={Color} />
          <Route path="/popular" component={Color} />
          <Route path="/color/:id" component={Color} />
          <Route path="/like" component={Color} />
          <Route path="/portfolio" component={Color} />
          <Route path="/new" component={AsyncNewColor} />
          <Route path="/adminpanel" component={AsyncAdminPanel} />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
