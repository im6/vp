import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../components/App';
import Html from '../components/Html';
import { PORT } from '../constant';
import routes from './routes';
import reducer from '../reducer';

const app = express()
app.use(express.static('dist'))
app.use('/api', routes)
app.get('/*', (req, res) => {
  const context = {}
  const scripts = ['bundle.js']
  const store = createStore(reducer);
  const app = <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
  
  const initState = store.getState()
  const htmlDOM = <Html
    title={'ColorPK - v3'}
    description={'Welcome to ColorPK'}
    scripts={scripts}
    initState={initState}
    >
    { renderToString(app) }
  </Html>
  const html = renderToStaticMarkup(htmlDOM);
  res.status(200);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT, () => console.log(`app is listening on port http://localhost:${PORT}`))