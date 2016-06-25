import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import articles, { coordinator as articleCoordinator } from './ducks/articles';
import authors from './ducks/authors';
import auth, { coordinator as authCoordinator } from './ducks/auth';
import global, { coordinator as globalCoordinator } from './ducks/global';
import combineCoordinators from './combineCoordinators';

export const reducers = {
  global,
  articles,
  authors,
  auth,

  // Third party
  routing: routerReducer,
  form: formReducer
};

export const coordinators = combineCoordinators(
  articleCoordinator,
  authCoordinator,
  globalCoordinator,
);
