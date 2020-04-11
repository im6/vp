/* eslint global-require:0, no-underscore-dangle: 0 */
import { fromJS } from 'immutable';
import {
  createStore,
  applyMiddleware,
  compose as compose0,
  combineReducers,
} from 'redux';

import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';
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
const initState = window._REDUXSTATE_;
const store = createStore(
  combineReducers(moduleReducers),
  {
    user: fromJS(initState.user),
    color: fromJS(initState.color),
  },
  compose(enhancers)
);

epicMiddleware.run(rootEpic);

export default store;
