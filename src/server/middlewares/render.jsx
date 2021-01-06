import { v1 as uuidV1 } from 'uuid';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { PUBLIC_PATH } from '../constant.server';
import {
  langSelectionKey,
  defaultLanguageKey,
  canvasOrientationKey,
  canvasDefaultVertical,
} from '../../constant';
import Html from 'components/Html';
import Layout from 'components/Layout';
import { LanguageProvider } from '../../context/Language/index';
import moduleReducers from '../../reducers';
import { isAuth, isAdmin } from '../helper';
import { languageCodes } from '../../translation';
import { createFacebookLink } from '../resource/oauth';

export default (req, res) => {
  const authOk = isAuth(req, true);
  const langCookie = req.cookies[langSelectionKey];
  const lang =
    langCookie && languageCodes[langCookie] ? langCookie : defaultLanguageKey;
  let userDetail = {
    lang,
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
        <LanguageProvider initLang={lang}>
          <Layout />
        </LanguageProvider>
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
      style={`${PUBLIC_PATH}/main.css`}
      script={`${PUBLIC_PATH}/main.js`}
      csrfToken={req.csrfToken()}
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      initState={store.getState()}
    >
      {appHtml}
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  // res.header('Access-Control-Allow-Origin', '*');
  res.send(`<!DOCTYPE html>${html}`);
};
