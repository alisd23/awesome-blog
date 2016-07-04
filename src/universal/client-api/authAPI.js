import 'isomorphic-fetch';
import { GET_CONFIG, POST_CONFIG } from './config';
import { handleResponse } from './response';

const checkForErrors = (data) => {
  if (data.errors) throw data.errors || [GENERIC_ERROR];
  return data;
}

export function logout() {
  return fetch(`/api/logout`, POST_CONFIG)
    .then(handleResponse);
}

export function login({ username, password }) {
  return fetch(`/api/login`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, password })
    })
    .then(handleResponse);
}

export function register({ username, password, name }) {
  return fetch(`/api/register`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, password, name })
    })
    .then(handleResponse);
}

export function updateProfile({ username, name }) {
  return fetch(`/api/update-profile`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, name })
    })
    .then(handleResponse);
}

export function changePassword({ currentPassword, newPassword, repeatPassword }) {
  return fetch(`/api/change-password`, {
      ...POST_CONFIG,
      body: JSON.stringify({ currentPassword, newPassword, repeatPassword })
    })
    .then(handleResponse);
}
