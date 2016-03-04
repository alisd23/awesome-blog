
const GET_CONFIG = {
  method: 'GET',
  credentials: 'include'
};
const POST_CONFIG = {
  method: 'POST',
  credentials: 'include'
};

/**
 * Attempt authentication using the fruksWeb session if it exists.
 * NOTE Catching errors is the responsibility of this functions CALLER
 * @return {Promise}  - Resolves to the result from the authenticateWithToken function
 */
export function authenticateFromSession() {
  return fetch('http://fruks.app/ajax/webtoken', {
      ...GET_CONFIG,
      mode: 'cors'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Session authentication failed');
      }
    })
    .then(key => authenticateWithToken(key));
}

/**
 * Authentication with the blog server using a json webtoken.
 * NOTE Catching errors is the responsibility of this functions CALLER
 * @param  {string} token - JWT token
 * @return {Promise}        Resolves to the authenticated user
 */
export function authenticateWithToken(token: string) {
  if (!token)
    return Promise.reject();

  return fetch(`/api/token-auth/${token}`, POST_CONFIG)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        return data.user;
      } else {
        throw new Error('Authentication failed');
      }
    });
}

export function fetchArticles() {
  return fetch('/api/articles', GET_CONFIG)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        return data.articles;
      } else {
        throw new Error(data.error);
      }
    })
    .catch((err) => {
      console.error("fetchArticles error - ", err);
    });
}
