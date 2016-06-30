import 'isomorphic-fetch';
import { GET_CONFIG, POST_CONFIG } from './config';
const GENERIC_ERROR = 'An error occurred';

export function logout() {
  return fetch(`/api/logout`, POST_CONFIG)
    .then(response => response.json());
    // Don't care about errors here
}

export function login({ username, password }) {
  return fetch(`/api/login`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data =>{
      if (data.error) throw data.error || GENERIC_ERROR;
      return data;
    });
}

export function register({ username, password, name }) {
  return fetch(`/api/register`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, password, name })
    })
    .then(response => response.json())
    .then(data =>{
      if (data.error) throw data.error || GENERIC_ERROR;
      return data;
    });
}

export function updateProfile({ username, name }) {
  return fetch(`/api/update-profile`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, name })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) throw data.error || GENERIC_ERROR;
      return data;
    });
}
