
import { authenticateFromSession } from '../../../client/api/auth';

const LOGIN_FROM_SESSION = 'LOGIN_FROM_SESSION';
const LOGIN_FROM_TOKEN = 'LOGIN_FROM_TOKEN';
const LOGIN_FROM_DETAILS = 'LOGIN_FROM_DETAILS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const initialState = {
  user: null,
  loggingIn: false
}

//----------------------------//
//           Handler          //
//----------------------------//

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
        user: action.user
      };
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

function loginFailure(reason: string) {
  return {
    type: LOGIN_FAILURE,
    reason
  }
}

function loginSuccess(user: User) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

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
        dispatch(loginFailure(err));
      });
  }
}
