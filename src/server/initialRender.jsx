import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createOnServer } from '../universal/Store';
import Html from './html';
import { getAllArticles } from './controllers/ArticleController';

/**
 * State handlers, one for each route that can be accessed
 * @type {Object} - Map of pathname to handler
 */
const stateHandlers = {
  '/': getHomeState,
  default: getHomeState
}

/**
 * Initialise the store with the correct initial state depending on the route
 * then render the initial html (with the state attached to the window) and
 * return it.
 * NOTE: This function is async so we can use the await keyword inside to wait
 * for the promise to resolve
 * @param  {any} renderProps      - Information about the current route
 * @param  {any} reducerRegistry  - Registry for the redux reducers
 * @param  {any} isoTools         - Webpack isomorphic tools (the hack)
 * @return {string}               - HTML to send back to the client
 */
export default function getInitialHtml(renderProps, reducerRegistry, isoTools) {

  // Get correct handler for the state or a default handler if none is found
  const stateHandler =
    stateHandlers[renderProps.location.pathname]
      || stateHandlers.default;

  const sharedState = {
    routing: {
      location: renderProps.location
    }
  }

  return stateHandler(sharedState, renderProps)
    .then((state) => {
      const store = createOnServer(reducerRegistry, state);

      const component = (
        <Provider store={store}>
          <div>
            <RouterContext {...renderProps} />
          </div>
        </Provider>
      );

      // Render the initial html
      const html =
        <Html
          assets={isoTools.assets()}
          component={component}
          store={store} />;

      return `<!doctype html>\n${renderToString(html)}`;
    });
}


/**
 * INITIAL STATE HANDLERS
 * Get the correct state depending on the route accessed
 */

/**
 * State for the home page entry
 * - routing
 * - articles
 * @return {Promise} - Promise which resolves to the initial state
 */
function getHomeState(sharedState, renderProps) {
  return getAllArticles()
    .then((articles: Article) => {
      return {
        ...sharedState,
        articles
      };
    });
}
