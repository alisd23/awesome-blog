import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import App from './containers/App';
import ReducerRegistry from './redux/registry';

// Webpack Hacky environment isomorphic stuff
const ENV = typeof window !== 'undefined' ? 'client' : global.ENV;
// Require ensure shim
if (typeof require.ensure !== "function") require.ensure = (d, c) => c(require);
if (typeof require.include !== "function") require.include = () => {};


export default class routes {
  static store = null;
  static reducerRegistry = null;

  constructor(reducerRegistry) {
    this.reducerRegistry = reducerRegistry;
  }

  /**
  * Only need to inject this on the CLIENT side for lazy loading
  */
  injectStore(store) {
    this.store = store;
  }

  configure() {
    return (
      <Route path='/' component={App}>
        <IndexRoute getComponent={::this.getHomePage} />
        <Route path='/article/:id' getComponent={::this.getArticlePage}/>
      </Route>
    );
  }

  /**
   * ROUTE HANDLERS
   */
  getHomePage(location, cb) {
    if (ENV === 'client') {
      System.import('./containers/Home')
        .then(container => this.changeScreen(location, cb, container.default));
        // .catch(err => console.log('Epic fail: Home Page -- ', err));
    } else {
      require.ensure(['./containers/Home'], (require) => {
        const container = require('./containers/Home').default;
        this.changeScreen(location, cb, container);
      });
    }
  }
  getArticlePage(location, cb) {
    if (ENV === 'client') {
      System.import('./containers/Article')
        .then(container => this.changeScreen(location, cb, container.default));
        // .catch(err => console.log('Epic fail: Article Page -- ', err));
    } else {
      require.ensure(['./containers/Article'], (require) => {
        const container = require('./containers/Article').default;
        this.changeScreen(location, cb, container);
      });
    }
  }

  changeScreen(location, cb, component, reducer) {
    if (reducer) {
      this.reducerRegistry.register(reducer);
    }

    if (!this.store) {
      cb(null, component);
    // } else if (this.store.getState().routing.location.pathname === location.pathname) {
    } else {
      cb(null, component);
      // this.store.dispatch(endLoading);
    }
  }
}
