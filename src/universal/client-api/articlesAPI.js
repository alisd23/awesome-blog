import 'isomorphic-fetch';
import { GET_CONFIG, POST_CONFIG } from './config';

/**
 * Send like article request to blog server
 * @param  {string} articleId - Sent as route parameter
 * @return {Promise}          - Response result
 */
export function likeArticle(articleId: String) {
  return fetch(`/api/like-article/${articleId}`, {
      ...POST_CONFIG
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Like article failed');
      }
    });
}

/**
 * Send unlike article request to blog server
 * @param  {string} articleId - Sent as route parameter
 * @return {Promise}          - Response result
 */
export function unlikeArticle(articleId: String) {
  return fetch(`/api/unlike-article/${articleId}`, {
      ...POST_CONFIG
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unlike article failed');
      }
    });
}
