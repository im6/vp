import express from 'express';
import React from 'react';
import { renderToString } from "react-dom/server";
import Layout from '../components/layout';

const app = express()
const port = 3000
function htmlTemplate( reactDom ) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>React SSR</title>
      </head>
      
      <body>
          <div id="app">${ reactDom }</div>
          <script src="./app.bundle.js"></script>
      </body>
      </html>
  `;
}
app.get('/', (req, res) => {
    const reactDom = renderToString(<Layout />);
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom ) );
});

app.listen(port, () => console.log(`app is listening on port ${port}!`))