import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import { endLoading } from './redux/reducers/global';
import App from './containers/App';
import ReducerRegistry from './redux/registry';

// Require ensure shim
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };
if(typeof require.include !== "function") require.include = function() {};

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
        <IndexRoute getComponent={(location, cb) => {
          require.ensure([], require => {
            const component = require('./containers/Home').default;
            // If route has changed since link clicked - do not load page
            if (!this.store) {
              cb(null, component);
            } else if (this.store.getState().routing.location.pathname === location.pathname) {
              cb(null, component);
              this.store.dispatch(endLoading);
            }
          });
        }} />
      </Route>
    );
  }
}
