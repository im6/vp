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
let compose = compose0;

if(process.env.NODE_ENV === 'development'){
  const logger = require('redux-logger').default;
  middlewares.push(logger);
  compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  window.dispatchEvent(new Event('_COLORPK_SCRIPT_READY'));
}

const enhancers = applyMiddleware(...middlewares);
const store = createStore(combineReducers(moduleReducers),
  {},
  compose(enhancers),
);

sagaInitiator(sagaMiddleware);
ReactDOM.render(
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>,
  document.getElementById('app')
);
