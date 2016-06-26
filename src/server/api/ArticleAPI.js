
import {
  getArticles as getArticlesCtrl,
  likeArticle as likeArticleCtrl,
  unlikeArticle as unlikeArticleCtrl
} from '../controllers/ArticleController';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getArticles(req, res) {

  getArticlesCtrl()
    .then((articles: Article[]) => {
      res.status(200).send({
        success: 1,
        articles: articles
      });
    })
    .catch((err) => {
      console.log('GetArticles ERROR - ', err);
      res.status(400).send({
        success: 0,
        error: `Could not get articles - ${err}`
      });
    });
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
    return res
      .status(400)
      .send({
        success: 0,
        message: 'Invalid article'
      });
  }

  action(articleID, userID)
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500))
}
