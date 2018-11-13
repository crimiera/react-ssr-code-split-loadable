import express from "express"
import cors from "cors"
import React from "react"
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import {renderRoutes} from 'react-router-config';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../../dist/react-loadable.json';

const app = express()

app.use(express.static("dist"))

app.get("*", (req, res, next) => {console.log("active route");

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
 
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise.then((data) => {

    const context = { data }
    const  modules = [];

    let html = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
         <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      </Loadable.Capture>
    );

    let bundles = getBundles(stats, modules);
    
    console.log(bundles,stats.domain[0].file);
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="app">${html}</div>

          ${bundles.map(bundle => {
          //  return `<script src="/${bundle.file}"></script>`
  
            return `<script src="${bundle.publicPath}"></script>`
          }).join('\n')}
          <script src="${stats.domain[0].file}"></script>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/');
});


