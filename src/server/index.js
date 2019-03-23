import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from '../modules/app';

import Html from '../modules/Html';

const app = express()
const port = 3000
app.get('/*', (req, res) => {
  const context = {}
  const routerDOM = <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
  const htmlDOM = <Html
    title={'ColorPK - v3'}
    description={'Welcome to ColorPK'}
    >
    { renderToString(routerDOM) }
  </Html>
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(port, () => console.log(`app is listening on port ${port}!`))