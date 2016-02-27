import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import { endLoading } from './redux/reducers/global';
import App from './containers/App';
import ReducerRegistry from './redux/registry';

const ENV = typeof global !== 'undefined' ? global.ENV : 'client';

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
      <Route path="/" component={App}>
        <IndexRoute getComponent={::this.getHomePage} />
      </Route>
    );
  }

  /**
   * ROUTE HANDLERS
   */
  getHomePage(location, cb) {
    if (ENV === 'client') {
      System.import('./containers/Home')
        .then(container => this.changeScreen(location, cb, container))
        .catch(err => console.log('Epic fail: Home Page -- ', err));
    } else {
      const container = require('./containers/Home');
      this.changeScreen(location, cb, container);
    }
  }

  changeScreen(location, cb, component, reducer) {
    if (reducer) {
      this.reducerRegistry.register(reducer);
    }

    if (!this.store) {
      cb(null, component);
    } else if (this.store.getState().routing.location.pathname === location.pathname) {
      cb(null, component);
      this.store.dispatch(endLoading);
    }
  }
}
