import {
  login as loginCtrl,
  register as registerCtrl,
  updateProfile as updateProfileCtrl
} from '../controllers/AuthController';
import { successResponse, errorResponse } from './responses';

/**
 * Login given username and password
 * @return {void}
 */
export function login(req, res) {
  const { username, password } = req.body;

  loginCtrl({ username, password })
    .then(user => {
      req.session.user = user;
      successResponse(res, { user });
    })
    .catch(err => errorResponse(res, err));
}

/**
 * Register given username and password
 * @return {void}
 */
export function register(req, res) {
  const { username, password, name } = req.body;

  registerCtrl({ username, password, name })
    .then(user => {
      req.session.user = user;
      successResponse(res, { user });
    })
    .catch(err => errorResponse(res, err));
}

/**
 * Update profile for current user given username and password
 * @return {void}
 */
export function updateProfile(req, res) {
  const { username, password, name } = req.body;
  const { id } = req.session.user;

  updateProfileCtrl({ username, name, id })
    .then(user => {
      req.session.user = user;
      successResponse(res, { user });
    })
    .catch(err => errorResponse(res, err));
}

export function logout(req, res) {
  req.session.user = null;
  successResponse(res);
}

export default {
  login,
  register,
  logout,
  updateProfile
}
