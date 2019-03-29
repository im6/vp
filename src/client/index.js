import React from 'react';
import { hydrate } from 'react-dom'
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';
import saga from './saga';
import { fromJS } from 'immutable';

const sagaMiddleware = createSagaMiddleware();
const utils = [applyMiddleware(sagaMiddleware)];

if(process.env.NODE_ENV === 'development'){
  const logger = require('redux-logger').default;
  utils.push(applyMiddleware(window.__REDUX_DEVTOOLS_EXTENSION__));
  utils.push(applyMiddleware(logger));
};

const enhancers = compose(...utils);
const initState = createStore(reducer,
  fromJS(window._colorpk),
  enhancers,
);

sagaMiddleware.run(saga);

let render = () => {
  hydrate(
    <Provider store={initState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
}

if(process.env.NODE_ENV === 'development'){
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
