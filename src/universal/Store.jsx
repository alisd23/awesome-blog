import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import { compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Article from '../universal/Objects/Article';
import Author from '../universal/Objects/Author';
import { browserHistory } from 'react-router';

/**
 * Configure the redux store for the CLIENT side, including dev tools
 * @param  {Object} reducerRegistry
 * @param  {Component} DevTools     - Redux dev tools
 * @param  {Object} initialState    - Initial state from server
 * @return {store}                  - Redux store
 */
export function createOnClient(reducerRegistry, DevTools, initialState) {

  const middleware = [thunk, logger()];

  const reducer = combineReducers(reducerRegistry.getReducers());

  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
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
    authors: Author
  }

  // Convert initial state in to the correct Objects
  for (let name in stateToClass) {
    for (let id in state[name]) {
      state[name][id] = new stateToClass[name](state[name][id]);
    }
  }

  return state;
}
