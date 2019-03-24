import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, Link } from "react-router";
import App from '../components/App';
import Html from '../components/Html';

const app = express()
const port = 3000
app.get('/*', (req, res) => {
  const context = {}
  const appDOM = <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>

  const htmlDOM = <Html
    title={'ColorPK - v3'}
    description={'Welcome to ColorPK'}
    >
    { renderToString(appDOM) }
  </Html>
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(port, () => console.log(`app is listening on port http://localhost:${port}!`))