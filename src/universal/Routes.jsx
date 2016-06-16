import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import App from './components/App';
import ReducerRegistry from './redux/registry';
import { startPageChange, endPageChange } from './redux/ducks/global';

// Webpack Hacky environment isomorphic stuff
const ENV = typeof window !== 'undefined' ? 'client' : global.ENV;
// Require ensure shim
if (typeof require.ensure !== "function") require.ensure = (d, c) => c(require);
if (typeof require.include !== "function") require.include = () => {};

// Factory function to create routes
export default function(registry) {
  const reducerRegistry = registry;
  let store;
  let hasUserSession;

  /**
   * ROUTE HANDLERS
   */
  function getHomePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/home/HomeContainer')
        .then(container => changeScreen(location, cb, container.default));
    } else {
      require.ensure(['./pages/home/HomeContainer'], (require) => {
        const container = require('./pages/home/HomeContainer').default;
        changeScreen(location, cb, container);
      });
    }
  }

  function getArticlePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/article/Article')
        .then(container => changeScreen(location, cb, container.default));
    } else {
      require.ensure(['./pages/article/Article'], (require) => {
        const container = require('./pages/article/Article').default;
        changeScreen(location, cb, container);
      });
    }
  }

  function getProfilePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/profile/Profile')
        .then(container => changeScreen(location, cb, container.default));
        // .catch(err => console.log('Epic fail: Article Page -- ', err));
    } else {
      require.ensure(['./pages/profile/Profile'], (require) => {
        const container = require('./pages/profile/Profile').default;
        changeScreen(location, cb, container);
      });
    }
  }

  function changeScreen(location, cb, component, reducer) {
    if (store)
      store.dispatch(endPageChange);

    if (reducer) {
      reducerRegistry.register(reducer);
    }

    if (!store) {
      cb(null, component);
    // } else if (this.store.getState().routing.location.pathname === location.pathname) {
    } else {
      cb(null, component);
    }
  }

  const isAuthenticated = () => {
    if (ENV === 'client') {
      return store && store.getState().auth.user;
    } else {
      return hasUserSession;
    }
  };

  function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
      replace({ pathname: '/' });
    }
  }

  /**
  * Only need to inject this on the CLIENT side for lazy loading
  */
  function injectStore(newStore) {
    store = newStore;
  }
  function injectUserSession(user) {
    hasUserSession = !!user;
  }

  function configure() {
    return (
      <Route path='/' component={App}>
        <IndexRoute getComponent={getHomePage} />
        <Route
          path='/article/:id'
          getComponent={getArticlePage}/>
        <Route
          path='/account/profile'
          getComponent={getProfilePage}
          onEnter={requireAuth} />
      </Route>
    );
  }

  return {
    configure,
    injectStore,
    injectUserSession
  }
}
