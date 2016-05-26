import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, formatPattern } from 'react-router';

import { createOnServer } from '../universal/Store';
import Html from './html';
import { SOLID, TRANSPARENT} from '../universal/constants/NavbarTypes';

import { getArticles } from './controllers/ArticleController';
import { getAuthors } from './controllers/AuthorController';
import { articlesToState } from '../universal/redux/ducks/articles';
import { authorsToState } from '../universal/redux/ducks/authors';
import User from '../universal/Objects/User';

/**
 * State handlers, one for each route that can be accessed
 * @type {Object} - Map of pathname to handler
 */
const stateHandlers = {
  '/': getHomePageState,
  '/article/.+': getArticlePageState,
  default: getHomePageState
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
export default function getInitialHtml(renderProps, reducerRegistry, isoTools, user) {

  // Get correct handler for the state or a default handler if none is found
  const stateHandler = matchRoute(renderProps.location.pathname);

  return getSharedState(renderProps, user)
    .then(sharedState => stateHandler(sharedState, renderProps))
    .then(state => {
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
 * State for ALL pages - shared state
 * - routing
 * - articles
 * - authors
 * @return {Promise} - Promise which resolves to the initial state
 */
function getSharedState(renderProps, user) {
  return Promise.all([
    getArticles(),
    getAuthors()
  ])
    .then(([articles, authors]) => {
      return {
        articles: articlesToState(articles),
        authors: authorsToState(authors),
        routing: {
          location: renderProps.location
        },
        auth: {
          loggingIn: false,
          user: user ? new User(user) : null
        }
      };
    });
}

function getHomePageState(sharedState, renderProps) {
  return Promise.resolve(sharedState);
}

function getArticlePageState(sharedState, renderProps) {
  return Promise.resolve({
    ...sharedState,
    global: {
      navbarType: TRANSPARENT
    }
  });
}

function matchRoute(url) {
  for (let regex in stateHandlers) {
    if (url.match(new RegExp(`^${regex}\$`))) {
      return stateHandlers[regex];
    }
  }
  return stateHandlers.default;
}
