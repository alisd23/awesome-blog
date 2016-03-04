
import { getAllArticles } from '../controllers/ArticleController';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getArticles(req, res) {

  getAllArticles()
    .then((articles: Article[]) => {
      res.status(200).send({
        success: 1,
        articles: articles
      });
    })
    .catch((err) => {
      console.log("GetArticles ERROR - ", err);
      res.status(400).send({
        success: 0,
        error: `Could not get articles - ${err}`
      });
    });
}

export function likeArticle(req, res) {
  console.log('LIKE ARTICLE');
}

export default {
  getArticles,
  likeArticle
}
