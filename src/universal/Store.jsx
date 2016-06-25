import React from 'react';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger';
import { reduxObservable } from 'redux-observable';
import { browserHistory } from 'react-router';
import { coordinators } from './redux/core';

/**
 * Configure the redux store for the CLIENT side, including dev tools
 */
export function createOnClient(history, reducerRegistry, initialState, DevTools) {
  const middleware = [reduxObservable(coordinators), routerMiddleware(history)];
  let finalCreateStore;

  if (__DEVELOPMENT__) {
    middleware.push(logger());
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(...middleware)
    )(createStore);
  }

  const reducer = combineReducers(reducerRegistry.getReducers());
  const store = finalCreateStore(reducer, initialState);

  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}

/**
 * Configure the redux store for the SERVER side
 */
export function createOnServer(reducerRegistry, initialState) {
  const reducer = combineReducers(reducerRegistry.getReducers());
  const store = createStore(reducer, initialState);

  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}
