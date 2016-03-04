
import { getAllArticles } from '../controllers/ArticleController';

/**
 * Retrieve all articles and send result back to client
 * @return {void}
 */
export function getArticles(req, res) {
  getAllArticles()
    .then((articles: Article[]) => {
      console.log('GetArticles - ', articles);
      res.status(200).send(articles);
    })
    .catch((err) => {
      console.log("GetArticles ERROR - ", err);
      res.status(400).send(err);
    });
}

export default {
  getArticles
}
