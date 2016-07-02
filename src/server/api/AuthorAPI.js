import { getAuthors as getAuthorsCtrl } from '../controllers/ArticleController';
import { successResponse, errorResponse } from './responses';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getAuthors(req, res) {
  getAuthorsCtrl()
    .then(authors => successResponse(res, { authors }))
    .catch(err => errorResponse(res, 'Could not get authors'));
}


export default {
  getAuthors
}
