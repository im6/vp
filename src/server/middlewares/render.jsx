import uuid from 'uuid';
import React from 'react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { PUBLIC_PATH } from '../config';
import Html from 'components/Html';
import Layout from 'components/Layout';
import LangProvider from 'containers/Lang';
import moduleReducers from '../../reducers';
import { isAuth, isAdmin } from '../helper';

const version = uuid.v1().substring(0, 8);

export default (req, res) => {
  const { lang, canvas } = req.cookies;
  const store = createStore(combineReducers(moduleReducers), {
    user: fromJS({
      detail: isAuth(req)
        ? {
            name: 'loading',
            isadmin: isAdmin(req),
          }
        : null,
      facebookUrl: null,
      lang,
      loading: true,
    }),
    color: fromJS({
      loading: true,
      showVertical: canvas === '1',
      colorDef: {},
      liked: {},
      colorIdAllByDate: [],
      colorIdAllByLike: [],
      colorIdByMyOwn: [],
    }),
  });

  const app = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <LangProvider>
          <Layout />
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
  res.header('Access-Control-Allow-Origin', '*');
  res.send(`<!DOCTYPE html>${html}`);
};
