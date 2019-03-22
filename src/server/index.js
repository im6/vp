import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import App from '../modules/app';

import Html from '../modules/Html';

const app = express()
const port = 3000
app.get('/', (req, res) => {
  const data = {
    title: 'ColorPK - v3',
    description: 'Welcome to ColorPK',
  };
  data.children = renderToString(<App>
      <h1> hello world from app body</h1>
  </App>)

  const html = renderToStaticMarkup(<Html {...data} />);
  console.log(html)
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(port, () => console.log(`app is listening on port ${port}!`))