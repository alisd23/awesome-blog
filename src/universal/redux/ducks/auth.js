import {
  logout as apiLogout,
  login as apiLogin
} from '../../client-api/authAPI';
import User from '../../Objects/User';

// Action constants
const LOGIN = 'LOGIN';
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
    case LOGIN:
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
 * Simple form login
 * @return {[type]} [description]
 */
export function login({ username, password }, dispatch) {
  return new Promise((resolve, reject) => {
    apiLogin(username, password)
      .then((res) => {
        dispatch(loginSuccess(res.user));
        resolve();
      })
      .catch((err) => {
        reject({ _error: 'Invalid username or password :(' });
      });
  });
};

/**
 * Simple logout
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
