/* eslint global-require:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'
import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';


import App from '../modules/app/index.jsx';

import { createAction } from 'redux-actions';
import { getUserInfo, getInitAuth } from '../services/resource.js';
import { scrollTop } from '../misc/util.js';



const appDom = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const store = createStore(combineReducers(moduleReducers), applyMiddleware(sagaMiddleware));

sagaInitiator(sagaMiddleware);
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    appDom
  );
};

if (module.hot) {
  const renderNormally = render;
  const renderException = (error) => {
    const RedBox = require('redbox-react').default;

    ReactDOM.render(<RedBox error={error} />, appDom);
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      renderException(error);
    }
  };
}
render();
