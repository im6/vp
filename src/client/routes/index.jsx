import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Color from '../modules/color';
import SpinLoader from 'components/SpinLoader';

const AsyncAdminPanel = lazy(() =>
  import(/* webpackChunkName: "adminPanel" */ '../modules/adminPanel')
);
const AsyncNewColor = lazy(() =>
  import(/* webpackChunkName: "newColor" */ '../modules/newcolor')
);

const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'color/get' });
    dispatch({ type: 'user/auth' });
  }, []);
  return (
    <Suspense fallback={<SpinLoader />}>
      <Routes>
        <Route exact path="/" element={<Color source="colorIdAllByDate" />} />
        <Route path="/latest" element={<Color source="colorIdAllByDate" />} />
        <Route path="/popular" element={<Color source="colorIdAllByStar" />} />
        <Route
          path="/color/:id"
          element={<Color source="colorIdAllByDate" />}
        />
        <Route path="/like" element={<Color source="saved" />} />
        <Route path="/portfolio" element={<Color source="colorIdByMyOwn" />} />
        <Route path="/new" element={<AsyncNewColor />} />
        <Route path="/adminpanel" element={<AsyncAdminPanel />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
