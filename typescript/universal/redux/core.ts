import { routerReducer } from 'react-router-redux';
import { default as global } from './reducers/global';

const reducers = {
  global,

  // Third party
  routing: routerReducer
}

// FOR REDUCER HOT RELOADING //

export default reducers;
