
import ArticleModel from '../database/models/Article';
import Article from '../../universal/Objects/Article';

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function getAllArticles() {
  return ArticleModel.find().exec()
    .then((rawArticles: any[]) =>
      rawArticles.map((post) => {
        return new Article(post);
      })
    );
}
