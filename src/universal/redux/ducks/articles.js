import { UPDATE_LOCATION } from 'react-router-redux';
import { Observable } from 'rxjs/Rx';
import moment from 'moment';
import vagueTime from 'vague-time';
import {
  likeArticle as apiLikeArticle,
  unlikeArticle as apiUnlikeArticle
} from '../../client-api/articlesAPI';

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
 * Reducer for articles
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
        [articleId]: {
          ...article,
          meta: {
            ...article.meta,
            likes: newLikesArray
          }
        }
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
        [articleId]: {
          ...article,
          meta: {
            ...article.meta,
            likes: newLikesArray
          }
        }
      };
    }
    default:
      return state;
  };
}


//----------------------------//
//           Actions          //
//----------------------------//

/**
 * Liking/Unliking of article actions
 */
export const likeArticle = (articleId, userId) => () => (
  Observable.of({
    type: ARTICLE_LIKE,
    payload: { articleId, userId }
  })
);
export const unlikeArticle = (articleId, userId) => () => (
  Observable.of({
    type: ARTICLE_UNLIKE,
    payload: { articleId, userId }
  })
);

/**
 * Liking/Unliking failure actions (must revert what the above actions did)
 */
export const likeArticleFailed = (articleId, userId) => () => (
  Observable.of({
    type: ARTICLE_LIKE,
    payload: { articleId, userId },
    error: true
  })
);
export const unlikeArticleFailed = (articleId, userId) => () => (
  Observable.of({
    type: ARTICLE_UNLIKE,
    payload: { articleId, userId },
    error: true
  })
);

/**
 * Action creator which toggles the 'like' status for the given article
 * and user IF a user is logged in
 */
export const toggleArticleLike = (article) => (
  (actions, { dispatch, getState }) => {
    const user = getState().auth.user;
    if (!user)
      return Observable.empty();

    const articleLiked = article.meta.likes.indexOf(user.id) !== -1;
    const apiAction = articleLiked ? apiUnlikeArticle : apiLikeArticle;

    articleLiked
      ? dispatch(unlikeArticle(article.id, user.id))
      : dispatch(likeArticle(article.id, user.id));

    apiAction(article.id)
      // Do nothing on success (optimistic UI - UI updated preemptively)
      .catch((err) => (
        articleLiked
          ? dispatch(unlikeArticleFailed(article.id, user.id))
          : dispatch(likeArticleFailed(article.id, user.id))
      ));

    return Observable.empty();
  }
);

//------------------------------//
//           Selectors          //
//------------------------------//

export const getArticlesArray = (state) => (
  Object.keys(state.articles).map((k) => state.articles[k])
);

// Get headline article (currently newest article)
export const getHeadlineArticle = (state) => (
  getArticlesArray(state)[0]
);

// Get all NON-headline articles
export const getNonHeadlineArticles = (state) => (
  getArticlesArray(state).filter((a, i) => i > 0)
);

//----------------------------//
//           Helpers          //
//----------------------------//

/**
 * Transforms an array of articles into the state equivalent (id => Article)
 */
export const articlesToState = (list) => (
  list.reduce((list, a) => ({
    ...list,
    [a.id]: a
  }), {})
);
