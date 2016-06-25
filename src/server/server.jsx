import "babel-polyfill";
import path from 'path';
import express from 'express';
import session from 'express-session';
import minimatch from 'minimatch';
import bodyParser from 'body-parser';
import { match } from 'react-router';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

import { connectMongoDB } from './database/connection';
import createRoutes from '../universal/Routes';
import { reducers } from '../universal/redux/core';
import reducerRegistry from '../universal/redux/registry';
import initialRender from './initialRender';
import authApi from './api/AuthAPI';
import articleApi from './api/ArticleAPI';
import authMiddleware from './middleware/Auth';
import config from './app.config';

/**
 * Main server start function
 * @param  {any}  isoTools        - Webpack isomorphic tools (the hack)
 * @param  {bool} __DEVELOPMENT__ - Is development mode enabled?
 */
export default (isoTools, __DEVELOPMENT__) => {
  const PORT          = process.env.PORT || config.port;
  const projectRoot   = path.join(__dirname, '../..');
  const app           = express();

  // Connect to mySQL and mono databases when server launches. Connections
  // can be retrieved by these same methods later
  const mongoConn = connectMongoDB(config.mongo_url);

  const MongoStore = connectMongo(expressSession);

  /**
   *  MIDDLEWARE
   */
  if (process.env.NODE_ENV === 'production') {
    console.log('Production mode');
    app.set('trust proxy', 1); // trust first proxy
  }

  app.use(bodyParser.json());
  app.use(express.static(path.join(projectRoot, 'build')));

  app.use(session({
    ...config.session,
  	store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }));

  /**
  *  API ROUTES
  */

  // UNAUTHENTICATED ROUTES
  app.post('/api/login', authApi.login);
  app.post('/api/register', authApi.register);

  // AUTHENTICATED ROUTES
  app.use('/api', authMiddleware.checkSession);

  app.post('/api/logout', authApi.logout);

  app.get('/api/articles', articleApi.getArticles);
  app.post('/api/like-article/:id', articleApi.likeArticle);
  app.post('/api/unlike-article/:id', articleApi.unlikeArticle);

  /**
   * Any other request is handled by initial render function
   */
  app.get('*', handleInitialRender);

  /**
  *  INITIAL RENDER
  */
  function handleInitialRender(req, res) {
    reducerRegistry.register(reducers);
    const routes = createRoutes(reducerRegistry);
    routes.injectUserSession(req.session.user);

    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      isoTools.refresh();
    }

    match(
      { routes: routes.configure(), location: req.url || '/' },
      (error, redirectLocation, renderProps) => {
        if (error) {
          console.log('ERROR', error);
          res.status(500).send(error.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          initialRender(renderProps, reducerRegistry, isoTools, req.session.user)
            .then((html) => {
              res.status(200).send(html);
            })
            .catch((err) => {
              console.log('ERROR', error);
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
