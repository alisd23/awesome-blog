import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { compose } from 'redux';
import logger from 'redux-logger';
import { reduxObservable } from 'redux-observable';

import { browserHistory } from 'react-router';

/**
 * Configure the redux store for the CLIENT side, including dev tools
 * @param  {Object} reducerRegistry
 * @param  {Component} DevTools     - Redux dev tools
 * @param  {Object} initialState    - Initial state from server
 * @return {store}                  - Redux store
 */
export function createOnClient(history, reducerRegistry, initialState, DevTools) {
  const middleware = [reduxObservable(), routerMiddleware(history)];
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

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}

/**
 * Configure the redux store for the SERVER side
 * @param  {Object} reducerRegistry
 * @param  {Object} initialState    - Initial state
 * @return {store}                  - redux store
 */
export function createOnServer(reducerRegistry, initialState) {
  const middleware = [reduxObservable()];
  const reducer = combineReducers(reducerRegistry.getReducers());
  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combineReducers(reducers))
  });

  return store;
}
