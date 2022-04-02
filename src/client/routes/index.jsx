import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Color from '../modules/color';
import SpinLoader from 'components/SpinLoader';

const AsyncAdminPanel = lazy(() =>
  import(/* webpackChunkName: "adminPanel" */ '../modules/adminPanel')
);
const AsyncNewColor = lazy(() =>
  import(/* webpackChunkName: "newColor" */ '../modules/newcolor')
);

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'color/get' });
    dispatch({ type: 'user/auth' });
  }, []);
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
};

export default Routes;
