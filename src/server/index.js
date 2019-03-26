import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from 'react-router';
import App from '../components/App';
import Html from '../components/Html';
import { PORT } from '../constant';

const app = express()
app.use(express.static('dist'))

app.get('/*', (req, res) => {
  const context = {}
  const scripts = ['bundle.js']
  const app = <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
  const htmlDOM = <Html
    title={'ColorPK - v3'}
    description={'Welcome to ColorPK'}
    scripts={scripts}
    >
    { renderToString(app) }
  </Html>
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT, () => console.log(`app is listening on port http://localhost:${PORT}`))