import uuid from 'uuid';
import React from 'react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { PUBLIC_PATH } from '../config';
import Html from 'components/Html';
import App from 'components/App';
import LangProvider from 'containers/Lang';
import moduleReducers from '../../reducers';
import { isAuth, isAdmin } from '../helper';

const version = uuid.v1().substring(0, 8);

export default (req, res) => {
  const store = createStore(combineReducers(moduleReducers), {
    user: fromJS({
      detail: isAuth(req)
        ? {
            name: 'loading',
            isadmin: isAdmin(req),
          }
        : null,
      facebookUrl: null,
      lang: req.cookies.lang,
    }),
  });

  const app = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <LangProvider>
          <App />
        </LangProvider>
      </Provider>
    </StaticRouter>
  );
  const appHtml = renderToString(app);
  const htmlDOM = (
    <Html
      title={`${
        process.env.NODE_ENV === 'development'
          ? '(dev) ColorPK'
          : 'ColorPK | Your Best Color Picker'
      }`}
      version={version}
      style={`${PUBLIC_PATH}main.css`}
      script={`${PUBLIC_PATH}main.js`}
      csrfToken={req.csrfToken()}
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      initState={store.getState()}
    >
      {appHtml}
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};
