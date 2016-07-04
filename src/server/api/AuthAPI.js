import {
  login as loginCtrl,
  register as registerCtrl,
  updateProfile as updateProfileCtrl,
  changePassword as changePasswordCtrl
} from '../controllers/AuthController';
import { successResponse, errorResponse } from './responses';

const filterUser = user => {
  const { password, ...other } = user.toObject();
  return other;
}

export function login(req, res) {
  const { username, password } = req.body;

  loginCtrl({ username, password })
    .then(user => req.session.user = user)
    .then(filterUser)
    .then(user => successResponse(res, { user }))
    .catch(err => errorResponse(res, err));
}

export function register(req, res) {
  const { username, password, name } = req.body;

  registerCtrl({ username, password, name })
    .then(user => req.session.user = user)
    .then(filterUser)
    .then(user => successResponse(res, { user }))
    .catch(err => errorResponse(res, err));
}

export function updateProfile(req, res) {
  const { username, password, name } = req.body;
  const { id } = req.session.user;

  updateProfileCtrl({ username, name, id })
    .then(user => req.session.user = user)
    .then(filterUser)
    .then(user => successResponse(res, { user }))
    .catch(err => errorResponse(res, err));
}

export function changePassword(req, res) {
  const { currentPassword, newPassword, repeatPassword } = req.body;
  const { id } = req.session.user;

  changePasswordCtrl({ currentPassword, newPassword, repeatPassword, id })
    .then(user => req.session.user = user)
    .then(filterUser)
    .then(user => successResponse(res))
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
  updateProfile,
  changePassword
}
