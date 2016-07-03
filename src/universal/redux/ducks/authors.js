/**
 * Initial authors state
 * @type {Object} - A map of id -> User object
 */
const initialState = {};


//--------------------------//
//         REDUCERS         //
//--------------------------//

// NOTE - all authors are retrieved SERVER-SIDE so no receive authors
// action is required
export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  };
}

//----------------------------//
//           HELPERS          //
//----------------------------//

// Transforms an array of authors into the state equivalent (id => User)
export const authorsToState = (list) => (
  list.reduce((list, a) => ({
    ...list,
    [a.id]: a
  }), {})
);
