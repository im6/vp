import 'core-js';
import 'regenerator-runtime/runtime';
import { customEventPolyFill } from './misc/util';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Layout from 'components/Layout';
import store from './config/store';
import Routes from './routes';
import LangProvider from 'containers/Lang';
import { BrowserRouter } from 'react-router-dom';
import './bulma.modules.sass';
import Modal from './modules/modal';

customEventPolyFill();

hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <LangProvider>
        <Layout>
          <Modal />
          <Routes />
        </Layout>
      </LangProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
  () => {
    store.dispatch({ type: 'color/get' });
    store.dispatch({ type: 'user/auth' });
  }
);
if (process.env.NODE_ENV !== 'development') {
  window.dispatchEvent(new CustomEvent('_COLORPK_SCRIPT_READY'));
  console.log('client last build: ', process.env.lastBuildDate);
}
