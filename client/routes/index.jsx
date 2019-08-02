import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Color from '../modules/color';
import SpinLoader from '../modules/color/components/SpinLoader';

const AsyncAdminPanel = lazy(() =>
  import(/* webpackChunkName: "adminPanel" */ '../modules/adminPanel')
);
const AsyncNewColor = lazy(() =>
  import(/* webpackChunkName: "newColor" */ '../modules/newcolor')
);

const Routes = () => (
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

export default Routes;
