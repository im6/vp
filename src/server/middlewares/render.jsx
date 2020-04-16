import { v1 as uuidV1 } from 'uuid';
import React from 'react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { PUBLIC_PATH } from '../constant.server';
import {
  canvasOrientationKey,
  langSelectionKey,
  canvasDefaultVertical,
} from '../../constant';
import Html from 'components/Html';
import Layout from 'components/Layout';
import LangProvider from 'containers/Lang';
import moduleReducers from '../../reducers';
import { isAuth, isAdmin } from '../helper';
import { createFacebookLink } from '../resource/oauth';

const version = uuidV1().substring(0, 8);

export default (req, res) => {
  const authOk = isAuth(req, true);
  let userDetail = {
    lang: req.cookies[langSelectionKey],
    loading: true,
  };

  if (authOk) {
    userDetail = {
      ...userDetail,
      detail: {
        name: 'loading',
        isadmin: isAdmin(req),
      },
    };
  } else {
    const oauthState = uuidV1();
    req.session.app = {
      oauthState,
    };
    userDetail = {
      ...userDetail,
      detail: null,
      facebookUrl: createFacebookLink(oauthState),
    };
  }

  const showVertical =
    typeof req.cookies[canvasOrientationKey] === 'undefined'
      ? canvasDefaultVertical
      : req.cookies[canvasOrientationKey] === '1';

  const store = createStore(combineReducers(moduleReducers), {
    user: fromJS(userDetail),
    color: fromJS({
      loading: true,
      showVertical,
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
