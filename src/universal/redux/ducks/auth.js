import { authenticateFromSession } from '../../api/auth';
import User from '../../Objects/User';

// Action constants
const LOGIN_FROM_SESSION = 'LOGIN_FROM_SESSION';
const LOGIN_FROM_TOKEN = 'LOGIN_FROM_TOKEN';
const LOGIN_FROM_DETAILS = 'LOGIN_FROM_DETAILS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * Auth initial state
 * @type {Object} - State
 *  - user:       Current logged in user (if any)
 *  - loggingIn:  True if user is currently logging in (loading state)
 */
const initialState = {
  user: null,
  loggingIn: false
}


/**
 * Reducer to handle auth state - Authenticated user and logging in state
 * @param  {Object} state   - Current auth state
 * @param  {Object} action  - Next action to process
 * @return {Object}         - Next auth state
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FROM_SESSION:
    case LOGIN_FROM_TOKEN:
    case LOGIN_FROM_DETAILS:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: new User(action.user)
      };
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

/**
 * Login failure action creator
 * @return {Object} Login failure action
 */
function loginFailure() {
  return {
    type: LOGIN_FAILURE
  }
}

/**
 * Login success action creator
 * @return {Object} Login success action
 */
function loginSuccess(user: User) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

/**
 * Login from session action creator
 * dispatches initial action to show login attempt has started, then attempts to
 * authenticate, dispatching success or failure actions
 * @return {Object} Login success action
 */
export function loginFromSession() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_FROM_SESSION
    });

    authenticateFromSession()
      .then((user) => {
        if (user) {
          dispatch(loginSuccess(user));
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        // Create new alert if necessary
        // dispatch(loginFailure());
      });
  }
}
