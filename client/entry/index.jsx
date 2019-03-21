/* eslint global-require:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createLogger } from 'redux-logger'
import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';




import { createAction } from 'redux-actions';
import { getUserInfo, getInitAuth } from '../services/resource.js';
import { scrollTop } from '../misc/util.js';
import App from '../modules/app/index.jsx';
import Auth from '../modules/auth';
import Color from '../modules/color';
import NewColor from '../modules/newcolor';
import About from '../modules/about';
import ResourceApi from '../modules/resourceApi';
import AdminPanel from '../modules/adminPanel';


const appDom = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const store = createStore(combineReducers(moduleReducers), applyMiddleware(sagaMiddleware));

sagaInitiator(sagaMiddleware);

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
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
