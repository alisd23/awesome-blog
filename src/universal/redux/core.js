import { routerReducer } from 'react-router-redux';
import articles from './ducks/articles';
import global from './ducks/global';

const reducers = {
  global,
  articles,

  // Third party
  routing: routerReducer
}

// FOR REDUCER HOT RELOADING //

export default reducers;
