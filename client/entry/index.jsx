/* eslint global-require:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import createLogger from 'redux-logger';


import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';
import { Global } from '../config/global';
import Routes from '../routes/index.jsx';

const appDom = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();


const initialState = {};
let middlewares = [sagaMiddleware];
if(Global.isDev){
  middlewares.push(logger);
}
const enhancer = compose(
  applyMiddleware.apply(null, middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);


const store = createStore(combineReducers({
  ...moduleReducers, routing,
}), initialState, enhancer);

sagaInitiator(sagaMiddleware);

const history = syncHistoryWithStore(browserHistory, store);

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} store={store} />
    </Provider>,
    appDom
  );
};


if (module.hot && Global.isDev) {
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

  //module.hot.accept('../routes/index.jsx', () => {
  //  render();
  //});
}

render();
