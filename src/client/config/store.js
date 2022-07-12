/* eslint global-require:0, no-underscore-dangle: 0 */
import { fromJS } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';
import moduleReducers from '../../reducers';
import { reduxName } from '../../constant';

const epicMiddleware = createEpicMiddleware();
const middleware = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middleware.push(logger);
}

const initState = window[reduxName];
const preloadedState = {
  user: fromJS(initState.user),
  color: fromJS(initState.color),
};
const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: moduleReducers,
  middleware,
  preloadedState,
});

epicMiddleware.run(rootEpic);

export default store;
