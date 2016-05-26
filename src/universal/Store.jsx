import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Article from '../universal/Objects/Article';
import User from '../universal/Objects/User';
import { browserHistory } from 'react-router';

/**
 * Configure the redux store for the CLIENT side, including dev tools
 * @param  {Object} reducerRegistry
 * @param  {Component} DevTools     - Redux dev tools
 * @param  {Object} initialState    - Initial state from server
 * @return {store}                  - Redux store
 */
export function createOnClient(history, reducerRegistry, initialState, DevTools) {

  const middleware = [thunk, routerMiddleware(history)];

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

  initialState = transformInitialState(initialState);

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
  const middleware = [thunk];

  const reducer = combineReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

  initialState = transformInitialState(initialState);

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
 * Transform relevant state into its class instance form
 * @param  {Object}   - state
 * @return {Object}   - Transformed state
 */
function transformInitialState(state) {
  const stateToClass = {
    articles: Article,
    authors: User
  }

  // Convert initial state in to the correct Objects
  for (let name in stateToClass) {
    for (let id in state[name]) {
      state[name][id] = new stateToClass[name](state[name][id]);
    }
  }

  if (state.auth.user)
    state.auth.user = new User(state.auth.user);

  return state;
}
