import React from 'react';
import { hydrate } from 'react-dom'
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore } from 'redux'
import reducer from '../reducer';

const initState = createStore(reducer,
    window._colorpk,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
hydrate(
  <Provider store={initState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);