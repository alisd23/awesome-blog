import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import App from './components/App';
import NotFound from './pages/not-found/NotFound';
import ReducerRegistry from './redux/registry';
import { coordinators } from './redux/core';
import { startPageChange, pageLoadingEnd } from './redux/ducks/global';

// Webpack Hacky environment isomorphic stuff
const ENV = typeof window !== 'undefined' ? 'client' : global.ENV;
// Require ensure shim
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
if (typeof require.include !== 'function') require.include = () => {};

// Factory function to create routes
export default function(registry) {
  const reducerRegistry = registry;
  let store;
  let hasUserSession;

  function configure() {
    return (
      <Route path='/' component={App}>
        <IndexRoute getComponent={getHomePage} />
        <Route
          path='article/:id'
          getComponent={getArticlePage}/>
        <Route
          path='account'
          getComponent={getAccountPage}
          onEnter={requireAuth}>
          <Route
            path='profile'
            getComponent={getProfilePage}
          />
          <Route
            path='change-password'
            getComponent={getChangePasswordPage}
          />
          <Route
            path='my-blogs'
            getComponent={getMyBlogsPage}
          />
        </Route>
        <Route
          path='*'
          component={NotFound} />
      </Route>
    );
  }

  /**
   * ROUTE HANDLERS
   */
  function getHomePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/home/HomeContainer')
        .then(container => changeScreen(location, cb, container.default, true));
    } else {
      require.ensure(['./pages/home/HomeContainer'], (require) => {
        const container = require('./pages/home/HomeContainer').default;
        changeScreen(location, cb, container, true);
      });
    }
  }

  function getArticlePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/article/Article')
        .then(container => changeScreen(location, cb, container.default, true));
    } else {
      require.ensure(['./pages/article/Article'], (require) => {
        const container = require('./pages/article/Article').default;
        changeScreen(location, cb, container, true);
      });
    }
  }

  function getAccountPage(location, cb) {
    if (ENV === 'client') {
      System.import('./pages/account/AccountContainer')
        .then(container => changeScreen(location, cb, container.default, false));
    } else {
      require.ensure(['./pages/account/AccountContainer'], (require) => {
        const container = require('./pages/account/AccountContainer').default;
        changeScreen(location, cb, container, false);
      });
    }
  }

  function getProfilePage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/account/profile/ProfileContainer')
        .then(container => changeScreen(location, cb, container.default, true));
    } else {
      require.ensure(['./pages/account/profile/ProfileContainer'], (require) => {
        const container = require('./pages/account/profile/ProfileContainer').default;
        changeScreen(location, cb, container, true);
      });
    }
  }

  function getChangePasswordPage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/account/change-password/ChangePasswordContainer')
        .then(container => changeScreen(location, cb, container.default, true));
    } else {
      require.ensure(['./pages/account/change-password/ChangePasswordContainer'], (require) => {
        const container = require('./pages/account/change-password/ChangePasswordContainer').default;
        changeScreen(location, cb, container, true);
      });
    }
  }

  function getMyBlogsPage(location, cb) {
    if (store)
      store.dispatch(startPageChange);

    if (ENV === 'client') {
      System.import('./pages/account/my-blogs/MyBlogsContainer')
        .then(container => changeScreen(location, cb, container.default, true));
    } else {
      require.ensure(['./pages/account/my-blogs/MyBlogsContainer'], (require) => {
        const container = require('./pages/account/my-blogs/MyBlogsContainer').default;
        changeScreen(location, cb, container, true);
      });
    }
  }

  function changeScreen(location, cb, component, isBottomPage, reducer) {
    if (store && isBottomPage)
      store.dispatch(pageLoadingEnd());

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

  return {
    configure,
    injectStore,
    injectUserSession
  }
}
