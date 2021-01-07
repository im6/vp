import 'core-js';
import 'regenerator-runtime/runtime';
import { langSelectionKey, canvasOrientationKey } from '../constant';
import { customEventPolyFill } from './misc/util';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import store from './config/store';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './bulma.modules.sass';
import Modal from './modules/modal';
import { LayoutProvider } from '../context/Layout/index';
import { LanguageProvider } from '../context/Language/index';

customEventPolyFill();
hydrate(
  <BrowserRouter>
    <Provider store={store}>
      <LanguageProvider initLang={window[langSelectionKey]}>
        <LayoutProvider initVertical={window[canvasOrientationKey]}>
          <Modal />
          <Routes />
        </LayoutProvider>
      </LanguageProvider>
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
