/* eslint global-require:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose as compose0, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagaInitiator } from './config/saga';
import { moduleReducers } from './config/reducer';
import App from './modules/app';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose0;

if(__DEV__){
  const logger = require('redux-logger').default;
  middlewares.push(logger);
};
const enhancers = applyMiddleware(...middlewares);
const initState = createStore(combineReducers(moduleReducers),
  {},
  compose(enhancers),
);

sagaInitiator(sagaMiddleware);
ReactDOM.render(
  <Provider store={initState}>
    <App dispatch={initState.dispatch} />
  </Provider>,
  document.getElementById('app'),
);
