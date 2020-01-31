/* eslint global-require:0, no-underscore-dangle: 0 */
import {
  createStore,
  applyMiddleware,
  compose as compose0,
  combineReducers,
} from 'redux';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epic';
import moduleReducers from '../../reducers';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];
let compose = compose0;

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middlewares.push(logger);
  compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose0;
}

const enhancers = applyMiddleware(...middlewares);
const store = createStore(
  combineReducers(moduleReducers),
  {},
  compose(enhancers)
);

epicMiddleware.run(rootEpic);

export default store;
