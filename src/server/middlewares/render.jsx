import { v1 as uuidV1 } from 'uuid';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
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
import { LayoutProvider } from '../../contexts/Layout/index';
import { LanguageProvider } from '../../contexts/Language/index';
import moduleReducers from '../../reducers';
import { isAuth, isAdmin } from '../helper';
import { languageCodes } from '../../translation';
import { createLoginLink } from '../resource/oauth';

export default (req, res) => {
  const authOk = isAuth(req, true);
  const langCookie = req.cookies[langSelectionKey];
  const verticalCookie = req.cookies[canvasOrientationKey];
  const lang =
    langCookie && languageCodes[langCookie] ? langCookie : defaultLanguageKey;
  const isVertical = ['0', '1'].includes(verticalCookie)
    ? verticalCookie === '1'
    : canvasDefaultVertical;

  let userDetail;
  if (authOk) {
    userDetail = {
      loading: true,
      detail: {
        name: 'loading',
        isAdmin: isAdmin(req),
      },
    };
  } else {
    const oauthState = uuidV1();
    req.session.app = {
      oauthState,
    };
    userDetail = {
      loading: true,
      detail: null,
      weiboUrl: createLoginLink('wb', oauthState),
      githubUrl: createLoginLink('gh', oauthState),
      facebookUrl:
        process.env.NODE_ENV === 'development'
          ? createLoginLink('fb', oauthState)
          : null,
    };
  }

  const store = createStore(combineReducers(moduleReducers), {
    user: userDetail,
    color: fromJS({
      loading: true,
      colorDef: {},
      liked: {},
      colorIdAllByDate: [],
      colorIdAllByStar: [],
      colorIdByMyOwn: [],
    }),
  });

  const app = (
    <StaticRouter location={req.url}>
      <Provider store={store}>
        <LanguageProvider initLang={lang}>
          <LayoutProvider initVertical={isVertical} />
        </LanguageProvider>
      </Provider>
    </StaticRouter>
  );
  const htmlDOM = (
    <Html
      title={`${
        process.env.NODE_ENV === 'development'
          ? '(dev) ColorPK'
          : 'ColorPK | Your Best Color Picker'
      }`}
      languageCode={lang}
      isVertical={isVertical}
      style={`${PUBLIC_PATH}/main.css`}
      script={`${PUBLIC_PATH}/main.js`}
      csrfToken={req.csrfToken()}
      lastBuildDate={process.env.lastBuildDate || 'dev'}
      initState={store.getState()}
    >
      {renderToString(app)}
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);

  res.status(200);
  // res.header('Access-Control-Allow-Origin', '*');
  res.send(`<!DOCTYPE html>${html}`);
};
