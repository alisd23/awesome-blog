import { UPDATE_LOCATION } from 'react-router-redux';
import User from '../../Objects/User';

/**
 * Initial authors state
 * @type {Object} - A map of id -> User object
 */
const initialState = {};

/**
 * Reducer for authors
 * NOTE - all authors are retrieved SERVER-SIDE so no receive authors
 * action is required
 * @param  {Object} state   - Current authors state
 * @param  {Object} action  - Next action to process
 * @return {Object}         - Next authors state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  };
}


//----------------------------//
//           Helpers          //
//----------------------------//

/**
 * Transforms an array of authors into the state equivalent (id => User)
 * @param  {User[]} list  - list of authors
 * @return {Object}          - A mapping of id to author (the state)
 */
export function authorsToState(list) {
  const authors = {};
  list.forEach((a) => authors[a.id] = a);
  return authors;
}
