/* eslint global-require:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';
import { Global } from '../config/global';
import Routes from '../routes/index.jsx';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combineReducers({
  ...moduleReducers,
  routing,
}), {}, enhancer);

sagaInitiator(sagaMiddleware);

const history = syncHistoryWithStore(browserHistory, store);

if(!window[Global.appKey]){
  ReactDOM.render(
    <Provider store={store}>
      <Routes history={history} store={store} />
    </Provider>,
    document.getElementById('app')
  );
  window[Global.appKey] = true;
} else {
  console.warn("ColorPK is already loaded!")
}
