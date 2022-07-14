/* eslint global-require:0, no-underscore-dangle: 0 */
import {
  createStore,
  applyMiddleware,
  compose as reduxCompose,
  combineReducers,
} from 'redux';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';
import moduleReducers from '../../reducers';
import { reduxName } from '../../constant';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];
let compose = reduxCompose;

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middlewares.push(logger);
  compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
}

const enhancers = applyMiddleware(...middlewares);
const store = createStore(
  combineReducers(moduleReducers),
  window[reduxName],
  compose(enhancers)
);

epicMiddleware.run(rootEpic);

export default store;
