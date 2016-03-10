import {
  authenticateFromSession,
  authenticateWithCredentials,
  logout as apiLogout
} from '../../client-api/authAPI';
import User from '../../Objects/User';

// Action constants
const LOGIN_FROM_SESSION = 'LOGIN_FROM_SESSION';
const LOGIN_FROM_TOKEN = 'LOGIN_FROM_TOKEN';
const LOGIN_FROM_CREDENTIALS = 'LOGIN_FROM_CREDENTIALS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

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
    case LOGIN_FROM_CREDENTIALS:
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
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

/**
 * Login failure action
 * @type {Object}
 */
const loginFailure = {
  type: LOGIN_FAILURE
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
 * Logout action
 * @type {Object}
 */
const logoutSuccess = {
  type: LOGOUT
}

/**
 * Login from session action creator
 * dispatches initial action to show login attempt has started, then attempts to
 * authenticate, dispatching success or failure actions
 * @return {Object} Login from session thunk action
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
        dispatch(loginFailure);
      });
  }
}

/**
 * Action creator for logging in with username & password
 * @param  {Object}   data        - username and password
 * @param  {Function} dispatch
 * @return {Promise}  - Rejects to notify form of any errors
 */
export function loginWithCredentials(data, dispatch) {
  return new Promise((resolve, reject) => {
    authenticateWithCredentials(data.email, data.password)
      .then((user) => {
        dispatch(loginSuccess(user));
        resolve();
      })
      .catch((err) => {
        reject({ _error: 'Invalid username or password :(' });
      });
  });
};

/**
 * Simple
 * @return {[type]} [description]
 */
export function logout() {
  return (dispatch) => {
    apiLogout()
      .then(response => {
        dispatch(logoutSuccess);
      })
      .catch((err) => {
        dispatch(logoutSuccess);
      });
  }
}
