/* eslint global-require:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose as compose0, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagaInitiator } from '../config/saga';
import { moduleReducers } from '../config/reducer';
import App from '../modules/app/index.jsx';

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
    <App />
  </Provider>,
  document.getElementById('app'),
);

// import App from '../modules/app/index.jsx';

// const appDom = document.getElementById('app');
// const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger();

// const store = createStore(combineReducers(moduleReducers), applyMiddleware(sagaMiddleware));

// sagaInitiator(sagaMiddleware);
// let render = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     appDom
//   );
// };

// if (module.hot) {
//   const renderNormally = render;
//   const renderException = (error) => {
//     const RedBox = require('redbox-react').default;

//     ReactDOM.render(<RedBox error={error} />, appDom);
//   };
//   render = () => {
//     try {
//       renderNormally();
//     } catch (error) {
//       renderException(error);
//     }
//   };
// }
// render();
