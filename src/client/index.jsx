import 'core-js';
import 'regenerator-runtime/runtime';
import { langSelectionKey, canvasOrientationKey } from '../constant';
import { setCookie, customEventPolyFill } from './misc/util';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './config/store';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import './bulma.modules.sass';
import Modal from './modules/modal';
import { LayoutProvider } from '../contexts/Layout/index';
import { LanguageProvider } from '../contexts/Language/index';

hydrateRoot(
  document.getElementById('app'),
  <BrowserRouter>
    <Provider store={store}>
      <LanguageProvider
        initLang={window[langSelectionKey]}
        onChange={(l) => {
          setCookie(langSelectionKey, l);
        }}
      >
        <LayoutProvider
          initVertical={window[canvasOrientationKey]}
          onChange={(v) => {
            setCookie(canvasOrientationKey, v ? '1' : '0');
          }}
        >
          <Modal />
          <Routes />
        </LayoutProvider>
      </LanguageProvider>
    </Provider>
  </BrowserRouter>
);

if (process.env.NODE_ENV !== 'development') {
  customEventPolyFill();
  window.dispatchEvent(new CustomEvent('_COLORPK_SCRIPT_READY'));
  console.log('client last build: ', process.env.lastBuildDate);
}
