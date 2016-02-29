import { UPDATE_LOCATION } from 'react-router-redux';

const START_LOADING = UPDATE_LOCATION;
const END_LOADING = 'END_LOADING';

const initialState = {
  loading: false
}

//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({},
        state,
        { loading: false }
      );
    case END_LOADING:
      return Object.assign({},
        state,
        { loading: false }
      );
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

export function startLoading() {
  return (dispatch) => {
    dispatch({
      type: START_LOADING
    });
  }
}

export function endLoading(path: string) {
  return (dispatch, getState) => {
    const state = getState();

    if (state.routing.location.pathname === path) {
      dispatch({
        type: END_LOADING
      });
    }
  }
}
