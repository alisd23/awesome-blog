import { UPDATE_LOCATION } from 'react-router-redux';
import Author from '../../Objects/Author';

const RECEIVE_AUTHORS = 'RECEIVE_AUTHORS';

const initialState = {};

//----------------------------//
//           Handler          //
//----------------------------//

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AUTHORS: {
      const { authors } = action;
      const newAuthors = {}
      authors.forEach((a) => {
        authors[a.id] = new Author(a);
      });
      // Merge the bloposts as to not duplicate posts
      return {
        ...state,
        ...newAuthors
      };
    }
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function receiveAuthors() {
  return {
    type: RECEIVE_AUTHORS
  };
}


//----------------------------//
//           Helpers          //
//----------------------------//

/**
 * Transforms an array of authors into the state equivalent (id => Author)
 * @param  {Author[]} list  - list of authors
 * @return {Object}          - A mapping of id to author (the state)
 */
export function authorsToState(list) {
  const authors = {};
  list.forEach((a) => authors[a.id] = a);
  return authors;
}
