import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Store } from 'redux';

import { endLoading } from './redux/reducers/global';
import App from './containers/App';
import ReducerRegistry from './redux/registry';

// Require ensure shim
if(typeof (require as any).ensure !== "function") (require as any).ensure = function(d, c) { c(require) };
if(typeof (require as any).include !== "function") (require as any).include = function() {};

export default class routes {

  private store: Store = null;
  private reducerRegistry: any = null;

  constructor(reducerRegistry) {
    this.reducerRegistry = reducerRegistry;
  }

  /**
  * Only need to inject this on the CLIENT side for lazy loading
  */
  injectStore(store: Store) {
    this.store = store;
  }

  configure() {

    return (
      <Route path="/" component={App}>
        <IndexRoute getComponent={(location, cb) => {
          (require as any).ensure([], require => {
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
