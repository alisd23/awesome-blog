
import path from 'path';
import express from 'express';
import session from 'express-session';
import minimatch from 'minimatch';
import bodyParser from 'body-parser';
import { match } from 'react-router';

import { connectMongoDB, connectMySql } from './database/connection';
import Routes from '../universal/Routes';
import coreReducers from '../universal/redux/core';
import reducerRegistry from '../universal/redux/registry';
import initialRender from './initialRender';
import articleApi from './api/ArticleAPI';
import authApi from './api/AuthAPI';
import authMiddleware from './middleware/Auth';
import config from './config';


/**
 * Main server start function
 * @param  {any}  isoTools        - Webpack isomorphic tools (the hack)
 * @param  {bool} __DEVELOPMENT__ - Is development mode enabled?
 */
export default (isoTools, __DEVELOPMENT__) => {
  const PORT          = 8000;
  const projectRoot   = path.join(__dirname, '../..');

  const app = express();

  // Connect to mySQL and mono databases when server launches. Connections
  // can be retrieved by these same methods later
  const mongoConn = connectMongoDB();
  const sqlConn = connectMySql();


  /**
   *  MIDDLEWARE
   */
  if (process.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }

  app.use(bodyParser.json());
  app.use(express.static(path.join(projectRoot, 'build')));

  app.use(session(config.session));


  /**
  *  API ROUTES
  */

  // UNAUTHENTICATED ROUTES
  app.post('/api/token-auth/:token', authApi.authenticateWithToken);

  // AUTHENTICATED ROUTES
  app.use('/api', authMiddleware.checkSession);

  app.get('/api/articles', articleApi.getArticles);
  app.get('/api/like-article/:id', articleApi.likeArticle);


  /**
   * Any other request is handled by initial render function
   */
  app.get('*', handleInitialRender);


  /**
  *  INITIAL RENDER
  */
  function handleInitialRender(req, res) {
    
    reducerRegistry.register(coreReducers);
    const routes = new Routes(reducerRegistry);

    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      isoTools.refresh();
    }

    match(
      { routes: routes.configure(), location: req.url || '/' },
      (error, redirectLocation, renderProps: any) => {
        if (error) {
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {

          initialRender(renderProps, reducerRegistry, isoTools)
            .then((html) => {
              res.status(200).send(html);
            })
            .catch((err) => {
              console.log("Server.jsx -", err);
              res.status(500).send(err);
            });

        } else {
          res.status(404).send('Not found');
        }
      }
    );
  }


  /**
  *  START SERVER
  */
  app.listen(PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎 Backend server listening on port %s.', PORT);
    }
  });
}
