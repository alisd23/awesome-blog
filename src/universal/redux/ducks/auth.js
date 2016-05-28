import {
  logout as apiLogout,
  login as apiLogin,
  register as apiRegister
} from '../../client-api/authAPI';
import { closeModal } from './global';
import Modals from '../../constants/Modals';

// Action constants
const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const REGISTER_ATTEMPT = 'REGISTER_ATTEMPT';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
    case REGISTER_ATTEMPT:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loggingIn: false
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.user
      };
    case LOGOUT_SUCCESS:
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

const loginAttempt = {
  type: LOGIN_ATTEMPT
}
const loginFailure = {
  type: LOGIN_FAILURE
}
function loginSuccess(user: User) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

const registerAttempt = {
  type: REGISTER_ATTEMPT
}
const registerFailure = {
  type: REGISTER_FAILURE
}
function registerSuccess(user: User) {
  return {
    type: REGISTER_SUCCESS,
    user
  }
}

const logoutSuccess = {
  type: LOGOUT_SUCCESS
}

export function logout() {
  return (dispatch) => {
    apiLogout();
    dispatch(logoutSuccess);
  }
}

//----------------------------//
//      Form Submissions      //
//----------------------------//

export function login(data, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(loginAttempt);

    apiLogin(data)
      .then(res => {
        dispatch(loginSuccess(res.user));
        dispatch(closeModal(Modals.LOGIN));
        resolve();
      })
      .catch(err => {
        dispatch(loginFailure);
        reject({
          _error: 'Invalid username or password :('
        });
      });
  });
};

/**
 * Simple form register for redux-forms
 */
export function register(data, dispatch) {
  return new Promise((resolve, reject) => {
    apiRegister(data)
      .then(res => {
        dispatch(registerSuccess(res.user));
        dispatch(closeModal(Modals.REGISTER));
        resolve();
      })
      .catch(err => {
        dispatch(registerFailure);
        reject({
          _error: 'Invalid details :('
        });
      });
  });
};
