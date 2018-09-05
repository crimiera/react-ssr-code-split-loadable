import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import {renderRoutes} from 'react-router-config';

import manifest from '../../dist/manifest.json';

const extractAssets =  Object.keys(manifest).filter((key)=>{ return manifest[key].match(/main/gi)  }).map(k => {
   return   `<script type="text/javascript" src="/${manifest[k]}"></script>`
});
   
console.log(extractAssets)
const app = express()

//app.use(cors())
app.use(express.static("dist"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data ,splitPoints:[]}
  
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="app">${markup}</div>
          ${extractAssets.join('')}
        </body>
      </html>
    `)
  }).catch(next)
})

  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });


