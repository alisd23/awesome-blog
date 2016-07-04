import {
  logout as apiLogout,
  login as apiLogin,
  register as apiRegister,
  updateProfile as apiUpdateProfile,
  changePassword as apiChangePassword
} from '../../client-api/authAPI';
import { closeModal } from './global';
import { addAlert } from './alerts';
import ModalTypes from '../../components/modals/ModalTypes';
import AlertTypes from '../../components/alerts/AlertTypes';
import action from '../action';
import combineCoordinators from '../combineCoordinators';

//----------------------------//
//        ACTION TYPES        //
//----------------------------//

const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const REGISTER_ATTEMPT = 'REGISTER_ATTEMPT';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';

const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT';
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


//--------------------------//
//          REDUCER         //
//--------------------------//
// Handles auth state - Authenticated user and logging in state

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
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
        user: payload.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload.user
      };
    default:
      return state;
  };
}

//----------------------------//
//           ACTIONS          //
//----------------------------//

const loginAttempt = () => action(LOGIN_ATTEMPT);
const loginSuccess = user => action(LOGIN_SUCCESS, { user });
const loginFailure = () => action(LOGIN_FAILURE);

const registerAttempt = () => action(REGISTER_ATTEMPT);
const registerSuccess = user => action(REGISTER_SUCCESS, { user });
const registerFailure = () => action(REGISTER_FAILURE);

const profileUpdateSuccess = user => action(PROFILE_UPDATE_SUCCESS, { user });

const logoutSuccess = () => action(LOGOUT_SUCCESS);
export const logout = () => action(LOGOUT_ATTEMPT);

//------------------------------//
//         COORDINATORS         //
//------------------------------//

const logoutCoordinator = (action$, { getState }) =>
  action$
    .ofType(LOGOUT_ATTEMPT)
    .filter(action => Boolean(getCurrentUser(getState())))
    .map(logoutSuccess)
    .do(apiLogout);

export const coordinator = combineCoordinators(
  logoutCoordinator
);

//------------------------------//
//           SELECTORS          //
//------------------------------//

export const getCurrentUser = state => state.auth.user;

//----------------------------//
//      FORM SUBMISSIONS      //
//----------------------------//

export const login = (data, dispatch) => (
  new Promise((resolve, reject) => {
    dispatch(loginAttempt());

    apiLogin(data)
      .then(res => {
        dispatch(loginSuccess(res.user));
        dispatch(closeModal(ModalTypes.LOGIN));
        resolve();
      })
      .catch(errors => {
        dispatch(loginFailure());
        reject({ _error: errors });
      });
  })
);

export const register = (data, dispatch) => (
  new Promise((resolve, reject) => {
    apiRegister(data)
      .then(res => {
        dispatch(registerSuccess(res.user));
        dispatch(closeModal(ModalTypes.REGISTER));
        resolve();
      })
      .catch(errors => {
        dispatch(registerFailure());
        reject({ _error: errors });
      });
  })
);

export const updateProfile = (data, dispatch) => (
  new Promise((resolve, reject) => {
    apiUpdateProfile(data)
      .then(res => {
        dispatch(profileUpdateSuccess(res.user));
        dispatch(addAlert({
          title: 'Profile updated',
          content: 'Your profile details were updated successfully',
          type: AlertTypes.SUCCESS
        }));
        resolve();
      })
      .catch(errors => reject({ _error: errors }));
    return Promise.resolve();
  })
);

export const changePassword = (data, dispatch) => (
  new Promise((resolve, reject) => {
    apiChangePassword(data)
      .then(res => {
        dispatch(addAlert({
          title: 'Password Changed',
          content: 'Your was changed successfully',
          type: AlertTypes.SUCCESS
        }));
        resolve();
      })
      .catch(errors => reject({ _error: errors }));
    return Promise.resolve();
  })
);
