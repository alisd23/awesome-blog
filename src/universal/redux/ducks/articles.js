import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';

import {
  likeArticle as apiLikeArticle,
  unlikeArticle as apiUnlikeArticle
} from '../../client-api/articlesAPI';
import action from '../action';
import combineCoordinators from '../combineCoordinators';
import { getCurrentUser } from './auth';

//----------------------------//
//        ACTION TYPES        //
//----------------------------//

const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
const TOGGLE_ARTICLE_LIKE = 'TOGGLE_ARTICLE_LIKE';

const ARTICLE_LIKE_REQUEST = 'ARTICLE_LIKE_REQUEST';
const ARTICLE_LIKE_FAILURE = 'ARTICLE_LIKE_FAILURE';
const ARTICLE_UNLIKE_REQUEST = 'ARTICLE_UNLIKE_REQUEST';
const ARTICLE_UNLIKE_FAILURE = 'ARTICLE_UNLIKE_FAILURE';

//--------------------------//
//         REDUCERS         //
//--------------------------//

export default function reducer(state = {}, action) {
  const { type, payload, error } = action;

  switch (type) {
    case ARTICLE_LIKE_REQUEST:
    case ARTICLE_LIKE_FAILURE:
    case ARTICLE_UNLIKE_REQUEST:
    case ARTICLE_UNLIKE_FAILURE:
      const article = state[payload.articleId];
      return article
        ? {
            ...state,
            [article.id]: reduceArticle(article, action)
          }
        : state;
    default:
      return state;
  };
}

// Reducer for a single Article
const reduceArticle = (state = {}, { type, payload, error }) => {
  switch (type) {
    case ARTICLE_LIKE_REQUEST:
    case ARTICLE_LIKE_FAILURE:
    case ARTICLE_UNLIKE_REQUEST:
    case ARTICLE_UNLIKE_FAILURE:
      const { userId } = payload;
      const isaLike =
        type === ARTICLE_LIKE_REQUEST ||
        type === ARTICLE_LIKE_FAILURE;

      const newLikesArray = isaLike
        ? error
          ? state.meta.likes.filter(id => id != userId)
          : state.meta.likes.concat(userId)
        : error
          ? state.meta.likes.concat(userId)
          : state.meta.likes.filter(id => id != userId);

      return {
        ...state,
        meta: {
          ...state.meta,
          likes: newLikesArray
        }
      };
  }
};


//----------------------------//
//           ACTIONS          //
//----------------------------//

// Liking/Unliking of article actions
export const likeArticle = (articleId, userId) =>
  action(ARTICLE_LIKE_REQUEST, { articleId, userId });

export const unlikeArticle = (articleId, userId) =>
  action(ARTICLE_UNLIKE_REQUEST, { articleId, userId });

// Liking/Unliking failure actions (must revert what the above actions did)
export const likeArticleFailed = (articleId, userId) =>
  action(ARTICLE_LIKE_FAILED, { articleId, userId }, { error: true });

export const unlikeArticleFailed = (articleId, userId) =>
  action(ARTICLE_UNLIKE_FAILED, { articleId, userId }, { error: true });

export const toggleArticleLike = (articleId) =>
  action(TOGGLE_ARTICLE_LIKE, { articleId });

//------------------------------//
//         COORDINATORS         //
//------------------------------//

const articleLikeCoordinator = (action$, { getState }) =>
  action$
    .ofType(TOGGLE_ARTICLE_LIKE)
    .filter(action => Boolean(getCurrentUser(getState())))
    .throttleTime(200)
    .switchMap(({ payload }) => {
      const { articleId } = payload;
      const articleLiked = hasUserLikedArticle(getState(), { articleId });
      const apiCall = articleLiked
        ? apiUnlikeArticle
        : apiLikeArticle;
      const requestAction = articleLiked ? unlikeArticle : likeArticle;
      const undoAction = articleLiked ? unlikeArticleFailed : likeArticleFailed;
      const user = getCurrentUser(getState());

      return Observable.fromPromise(apiCall(articleId))
        .catch(err => Observable.of(undoAction(articleId, user.id)))
        .startWith(requestAction(articleId, user.id))
        .filter(a => a && a.type); // Filter non-actions
    });

export const coordinator = combineCoordinators(
  articleLikeCoordinator
);

//------------------------------//
//           SELECTORS          //
//------------------------------//

export const getArticles = state => state.articles;
export const getArticleIdParam = (state, params) => params.articleId;

export const getSelectedArticle = createSelector(
  getArticles,
  getArticleIdParam,
  (articles, id) => articles[id]
);

export const getArticlesArray = createSelector(
  getArticles,
  articles => Object.keys(articles).map(k => articles[k])
);

// Get headline article (currently newest article)
export const getHeadlineArticle = createSelector(
  getArticlesArray,
  articles => articles[0]
);

export const getNonHeadlineArticles = createSelector(
  getArticlesArray,
  articles => articles.filter((a, i) => i > 0)
);

export const hasUserLikedArticle = createSelector(
  getSelectedArticle,
  getCurrentUser,
  (article, user) => article && user && article.meta.likes.find(id => user.id)
);

//----------------------------//
//           HELPERS          //
//----------------------------//

// Transforms an array of articles into the state equivalent (id => Article)
export const articlesToState = (list) => (
  list.reduce((list, a) => ({
    ...list,
    [a.id]: a
  }), {})
);
