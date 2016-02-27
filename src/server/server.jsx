import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import Routes from '../universal/Routes';
import { createOnServer } from '../universal/Store';
import coreReducers from '../universal/redux/core';
import reducerRegistry from '../universal/redux/registry';
import Html from './Html';

export default (isoTools, __DEVELOPMENT__) => {

  const PORT          = 8000;
  const DATABASE_NAME = 'my';
  const projectRoot   = path.join(__dirname, '../..');

  const app = express();

  /**
   *  MIDDLEWARE
   */
  app.use(express.static(path.join(projectRoot, 'build')));
  app.use(handleInitialRender);

  /**
  *  ROUTES
  */
  app.get('/data', (req, res) => {
    console.log('Getting data');
    res.status(200).send({ cool: 'datasss' });
  });

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

          const initialState = {
            routing: {
              location: renderProps.location
            }
          };
          const store = createOnServer(reducerRegistry, initialState);

          const component = (
            <Provider store={store}>
              <div>
                <RouterContext {...renderProps} />
              </div>
            </Provider>
          );

          // Render the initial html
          // - Store: Place initial state on the browser window object for the client to read on load
          // - assets: Load the relevant assets into the markup using webpackIsomorphicTools
          // - component: The main component to render in the html root
          console.log("TEST 1");
          const html = (
            <Html assets={isoTools.assets()} component={component} store={store} />
          );

          res
            .status(200)
            .send('<!doctype html>\n' + renderToString(html));

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
