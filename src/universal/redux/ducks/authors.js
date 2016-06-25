import { UPDATE_LOCATION } from 'react-router-redux';

/**
 * Initial authors state
 * @type {Object} - A map of id -> User object
 */
const initialState = {};

/**
 * Reducer for authors
 * NOTE - all authors are retrieved SERVER-SIDE so no receive authors
 * action is required
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

// Transforms an array of authors into the state equivalent (id => User)
export const authorsToState = (list) => (
  list.reduce((list, a) => ({
    ...list,
    [a.id]: a
  }), {})
);
