import 'isomorphic-fetch';
import localConfig from '../../server/local.config';
import { GET_CONFIG, POST_CONFIG } from './config';

/**
 * Logout
 * @return {Promise}
 */
export function logout() {
  return fetch(`api/logout`, POST_CONFIG)
    .then(response => response.json());
    // Don't care about errors here
}

/**
 * Login
 * @return {Promise}
 */
export function login({ username, password }) {
  console.log('\n\nATTEMPT LOGIN\n\n')
  return fetch(`api/login`, {
      ...POST_CONFIG,
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json());
    // Don't care about errors here
}
