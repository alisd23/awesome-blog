import { routerReducer } from 'react-router-redux';
import articles from './ducks/articles';
import authors from './ducks/authors';
import global from './ducks/global';

const reducers = {
  global,
  articles,
  authors,

  // Third party
  routing: routerReducer
}

// FOR REDUCER HOT RELOADING //

export default reducers;
