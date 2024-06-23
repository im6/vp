/* eslint global-require:0, no-underscore-dangle: 0 */
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';
import reducerSlices from '../../reducers';
import { reduxName } from '../../constant';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middlewares.push(logger);
}

const store = configureStore({
  reducer: reducerSlices,
  middleware: () => middlewares,
  devTools: process.env.NODE_ENV === 'development',
  preloadedState: window[reduxName],
});

epicMiddleware.run(rootEpic);

export default store;
