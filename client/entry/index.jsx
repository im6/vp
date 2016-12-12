/* eslint global-require:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import createLogger from 'redux-logger';


import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';


const appDom = document.getElementById('app');
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

import App from '../modules/app';
import Todos from '../modules/todos';
import Users from '../modules/users';
import ErrorPage from '../modules/errorPage';
import Hello from '../modules/Hello';
import Auth from '../modules/auth/index.jsx';

const initialState = {};
const enhancer = compose(
  applyMiddleware(sagaMiddleware, logger),
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
      <Router history={history} >
        <Route path="/" component={App}>
          <IndexRoute component={Hello}/>
          <Route path="todos" component={Todos}/>
          <Route path="users" component={Users} />
          <Route path="*" component={ErrorPage} />
        </Route>
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
  module.hot.accept('../routes/index', () => {
    render();
  });
}

render();
