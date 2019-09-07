/* eslint no-console: 0 */
import uuid from 'uuid';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { _DEV_, PUBLIC_PATH } from '../config';
import Html from '../modules/Html';
import App from '../modules/App';

const version = uuid.v1().substring(0, 8);

const FRONTURLs = [
  '',
  'portfolio',
  'popular',
  'latest',
  'like',
  'color',
  'new',
  'adminpanel',
];

export default (req, res, next) => {
  const subUrl = req.url.split('/');
  if (FRONTURLs.includes(subUrl[1])) {
    if (_DEV_) {
      console.log(`${req.method}: ${req.originalUrl}`);
    } else {
      res.cookie('_csrf', req.csrfToken());
    }

    const app = <App url={req.path} />;
    const appHtml = renderToString(app);
    const htmlDOM = (
      <Html
        title={`${_DEV_ ? '(dev) ' : ''}ColorPK | Your Best Color Picker`}
        version={version}
        style={`${PUBLIC_PATH}main.css`}
        script={`${PUBLIC_PATH}main.js`}
      >
        {appHtml}
      </Html>
    );
    const html = renderToStaticMarkup(htmlDOM);
    res.status(200);
    res.send(`<!DOCTYPE html>${html}`);
  } else {
    next(404);
  }
};
