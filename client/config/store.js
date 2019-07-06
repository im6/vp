/* eslint global-require:0, no-underscore-dangle: 0 */
import {
  createStore,
  applyMiddleware,
  compose as compose0,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagaInitiator from './saga';
import moduleReducers from './reducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let compose = compose0;

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').default;
  middlewares.push(logger);
  compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose0;
} else {
  window.dispatchEvent(new Event('_COLORPK_SCRIPT_READY'));
}

const enhancers = applyMiddleware(...middlewares);
const store = createStore(
  combineReducers(moduleReducers),
  {},
  compose(enhancers)
);

sagaInitiator(sagaMiddleware);

export default store;
