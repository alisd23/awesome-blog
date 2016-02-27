import React        from 'react';
import { render }   from 'react-dom';

import { Store }                          from 'redux';
import { Provider }                       from 'react-redux';
import { syncHistoryWithStore }           from 'react-router-redux';
import { Router, browserHistory, match }  from 'react-router';
import LogMonitor                         from 'redux-devtools-log-monitor';
import DockMonitor                        from 'redux-devtools-dock-monitor';
import { createDevTools }                 from 'redux-devtools';

import reducerRegistry      from '../universal/redux/registry';
import Routes               from '../universal/Routes';
import { createOnClient }   from '../universal/Store';
import coreReducers         from '../universal/redux/core';

const DevToolsComponent =
  <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      defaultPosition="bottom"
      defaultIsVisible={false} >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>

const DevTools = createDevTools(DevToolsComponent);

reducerRegistry.register(coreReducers);
const routes = new Routes(reducerRegistry);

const matchParams = {
  history: browserHistory,
  routes: routes.configure()
}

/**
 * This magic allows router to load correct reducer and components depending on which route we are in
 */
match(matchParams, (error, redirectLocation, renderProps) => {

  const initialState  = window.__INITIAL_STATE__;
  const store         = createOnClient(reducerRegistry, DevTools, initialState);
  const history       = syncHistoryWithStore(browserHistory, store)

  routes.injectStore(store);

  // RENDER APP
  render(
    <Provider store={store}>
      <div>
        <Router {...renderProps} />
      </div>
    </Provider>,
    document.getElementById('root')
  );

  // RENDER DEV TOOLS
  render(
    <DevTools store={store} />,
    document.getElementById('dev-tools')
  )


  //--------------------------//
  //  HOT RELOADING REDUCERS  //
  //--------------------------//
  if (__DEVELOPMENT__ && module.hot) {

    // CORE REDUCERS
    module.hot.accept('../universal/redux/core', () => {
      console.log("CORE");
      reducerRegistry.updateReducers(store, require('../universal/redux/core').default);
    });
  }

});
