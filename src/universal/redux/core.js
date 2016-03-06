import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import articles from './ducks/articles';
import authors from './ducks/authors';
import auth from './ducks/auth';
import global from './ducks/global';

const reducers = {
  global,
  articles,
  authors,
  auth,

  // Third party
  routing: routerReducer,
  form: formReducer
}

// FOR REDUCER HOT RELOADING //

export default reducers;
