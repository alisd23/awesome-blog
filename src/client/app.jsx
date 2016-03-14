import React from 'react';
import { render } from 'react-dom';
import "babel-polyfill";

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory, match } from 'react-router';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createDevTools } from 'redux-devtools';

import reducerRegistry from '../universal/redux/registry';
import Routes from '../universal/Routes';
import { createOnClient } from '../universal/Store';
import coreReducers from '../universal/redux/core';
import { loginFromSession } from '../universal/redux/ducks/auth';

let DevTools;

if (__DEVELOPMENT__) {
  const DevToolsComponent =
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        defaultPosition="bottom"
        defaultIsVisible={false} >
      <LogMonitor theme="tomorrow" />
    </DockMonitor>
  DevTools = createDevTools(DevToolsComponent);
}

reducerRegistry.register(coreReducers);
const routes = new Routes(reducerRegistry);

const matchParams = {
  history: browserHistory,
  routes: routes.configure()
}

/**
 * This magic allows router to load correct reducer and components depending on
 * which route we are in
 */
match(matchParams, (error, redirectLocation, renderProps) => {

  const initialState  = window.__INITIAL_STATE__;
  const store         = createOnClient(browserHistory, reducerRegistry, initialState, DevTools);
  const history       = syncHistoryWithStore(browserHistory, store);

  // Attempt athentication from FruksWeb session token
  store.dispatch(loginFromSession());
  routes.injectStore(store);

  // RENDER APP
  render(
    <Provider store={store} key="provider">
      <div>
        <Router {...renderProps} />
      </div>
    </Provider>,
    document.getElementById('root')
  );

  if (__DEVELOPMENT__) {
    // RENDER DEV TOOLS
    render(
      <DevTools store={store} />,
      document.getElementById('dev-tools')
    );
  }

  //--------------------------//
  //  HOT RELOADING REDUCERS  //
  //--------------------------//
  if (__DEVELOPMENT__ && module.hot) {

    // CORE REDUCERS
    module.hot.accept('../universal/redux/core', () => {
      reducerRegistry.updateReducers(store, require('../universal/redux/core').default);
    });
  }

});
