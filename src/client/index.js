import React from 'react';
import { hydrate } from 'react-dom'
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose as compose0 } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';
import saga from './saga';
import { fromJS } from 'immutable';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose0;

if(__DEV__){
  const logger = require('redux-logger').default;
  middlewares.push(logger);
};

const enhancers = applyMiddleware(...middlewares);
const initState = createStore(reducer,
  fromJS(window._colorpk),
  compose(enhancers),
);

sagaMiddleware.run(saga);

const render = () => {
  hydrate(
    <Provider store={initState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
}

render();
