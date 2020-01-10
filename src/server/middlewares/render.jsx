import uuid from 'uuid';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { PUBLIC_PATH } from '../config';
import Html from '../modules/Html';
import App from '../modules/App';
import { LanguageContextProvider } from '../../isomorphic/LanguageContext';

const version = uuid.v1().substring(0, 8);

export default (req, res) => {
  const app = (
    <LanguageContextProvider lang={req.cookies.lang}>
      <App url={req.path} />
    </LanguageContextProvider>
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
      lastBuildDate={process.env.lastBuildDate}
    >
      {appHtml}
    </Html>
  );
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
};
