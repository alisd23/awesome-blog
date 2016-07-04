import {
  getArticles as getArticlesCtrl,
  likeArticle as likeArticleCtrl,
  unlikeArticle as unlikeArticleCtrl
} from '../controllers/ArticleController';
import { successResponse, errorResponse } from './responses';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getArticles(req, res) {
  getArticlesCtrl()
    .then(articles => successResponse(res, { articles }))
    .catch(err => errorResponse(res, 'Could not get articles'));
}

/**
 * Like an article as the current user
 * @return {void}
 */
export function likeArticle(req, res) {
  articleLikeHelper(req, res, likeArticleCtrl);
}

/**
 * Unlike an article as the current user
 * @return {void}
 */
export function unlikeArticle(req, res) {
  articleLikeHelper(req, res, unlikeArticleCtrl);
}

export default {
  getArticles,
  likeArticle,
  unlikeArticle
}


/**
 * HELPERS
 */

function articleLikeHelper(req, res, action) {
  const userID = req.session.user.id;
  const articleID = req.params.id;

  if (!articleID) {
    return errorResponse(res, 'Invalid article');
  }

  action(articleID, userID)
    .then(() => successResponse(res))
    .catch(err => errorResponse(res, err, 500))
}
