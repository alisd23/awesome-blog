import ArticleModel from '../database/models/Article';
import { Types } from 'mongoose';

/**
 * Get ALL the articles from the database
 * @return {Promise} Resolves to an array of articles
 */
export function getArticles() {
  return ArticleModel
    .find()
    .exec();
}

/**
 * Add a like for the given article and user
 * @param  {string} articleId
 * @param  {number} userId    - Fruks Web ID
 * @return {Promise} Resolves to the updated article
 */
export function likeArticle(articleId, userId) {
  console.log(articleId, userId);
  
  return ArticleModel
    .update(
      // Conditions
      {
        _id: Types.ObjectId(articleId),
        'meta.likes': {
          $not: { $elemMatch: { $eq: userId } }
        }
      },
      // Updates
      {
        $push: { 'meta.likes': userId }
      }
    )
    .exec()
    .then(result => {
      if (!result.ok) {
        throw new Error('Article like failed');
      }
    })
}

export function unlikeArticle(articleId, userId) {
  return ArticleModel
    .update(
      // Conditions
      {
        _id: Types.ObjectId(articleId)
      },
      // Updates
      {
        $pull: { 'meta.likes': userId }
      }
    )
    .exec()
    .then(result => {
      if (!result.ok) {
        throw new Error('Article unlike failed');
      }
    })
}
