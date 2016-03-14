import { UPDATE_LOCATION } from 'react-router-redux';
import Article from '../../Objects/Article';
import {
  likeArticle as apiLikeArticle,
  unlikeArticle as apiUnlikeArticle } from '../../client-api/articlesAPI';

// Action constants
const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
const ARTICLE_LIKE = 'UPDATE_ARTICLE_LIKE';
const ARTICLE_UNLIKE = 'UPDATE_ARTICLE_UNLIKE';

/**
 * Initial articles state
 * @type {Object} - A map of id -> Article object
 */
const initialState = {}

/**
 * Redcuer for articles
 * @param  {Object} state   - Current articles state
 * @param  {Object} action  - Next action to process
 * @return {Object}         - Next global state
 */
export default function reducer(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case ARTICLE_LIKE : {
      const { articleId, userId } = payload;
      const article = state[articleId];
      let newLikesArray;

      if (error) {
        newLikesArray = article.meta.likes.filter(id => id != userId);
      } else {
        newLikesArray = article.meta.likes.concat(userId);
      }

      return {
        ...state,
        [articleId]: new Article({
          ...article,
          meta: {
            ...article.meta,
            likes: newLikesArray
          }
        })
      };
    }
    case ARTICLE_UNLIKE : {
      const { articleId, userId } = payload;
      const article = state[articleId];
      let newLikesArray;

      if (error) {
        newLikesArray = article.meta.likes.concat(userId);
      } else {
        newLikesArray = article.meta.likes.filter(id => id != userId);
      }

      return {
        ...state,
        [articleId]: new Article({
          ...article,
          meta: {
            ...article.meta,
            likes: newLikesArray
          }
        })
      };
    }
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//
//
/**
 * Liking/Unliking of article actions
 */
export function likeArticle(articleId: String, userId: number) {
  return {
    type: ARTICLE_LIKE,
    payload: { articleId, userId }
  }
}
export function unlikeArticle(articleId: String, userId: number) {
  return {
    type: ARTICLE_UNLIKE,
    payload: { articleId, userId }
  }
}

/**
 * Liking/Unliking failure actions (must revert what the above actions did)
 */
export function likeArticleFailed(articleId: String, userId: number) {
  return {
    type: ARTICLE_LIKE,
    payload: { articleId, userId },
    error: true
  }
}
export function unlikeArticleFailed(articleId: String, userId: number) {
  return {
    type: ARTICLE_UNLIKE,
    payload: { articleId, userId },
    error: true
  }
}

/**
 * Action creator which toggles the 'like' status for the given article
 * and user IF a user is logged in
 * @param  {Article} article  - Article to like or unlike
 * @return {Function}         - Redux thunk action creator
 */
export function toggleArticleLike(article: Article) {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    if (!user)
      return;

    const articleLiked = article.meta.likes.indexOf(user.id) !== -1;
    const apiAction = articleLiked ? apiUnlikeArticle : apiLikeArticle;

    articleLiked
      ? dispatch(unlikeArticle(article.id, user.id))
      : dispatch(likeArticle(article.id, user.id));

    apiAction(article.id)
      .then(() => {
        // Do nothing if on success (optimistic UI - UI updated preemptively)
      })
      .catch((err) => {
        articleLiked
          ? dispatch(unlikeArticleFailed(article.id, user.id))
          : dispatch(likeArticleFailed(article.id, user.id));
      });
  }
}

//----------------------------//
//           Helpers          //
//----------------------------//

/**
 * Transforms an array of articles into the state equivalent (id => Article)
 * @param  {Article[]} list  - list of articles
 * @return {Object}          - A mapping of id to article (the state)
 */
export function articlesToState(list) {
  const articles = {};
  list.forEach((a) => articles[a.id] = a);
  return articles;
}

/**
 * Get all the articles in array form
 * @param  {Object} articles  - Articles state
 * @return {Article[]}        - Array of all articles
 */
export function getArticlesArray(articles) {
  return Object.keys(articles).map((k) => articles[k]);
}
/**
 * Get headline article (currently newest article)
 * @param  {Object} articles  - Articles state
 * @return {Article}          - Headline article
 */
export function getHeadlineArticle(articles) {
  return getArticlesArray(articles)[0]
}
/**
 * Get all NON-headline articles
 * @param  {Object} articles  - Articles state
 * @return {Article[]}        - Array of non-headline articles
 */
export function getNonHeadlineArticles(articles) {
  return getArticlesArray(articles).filter((a, i) => i > 0);
}
