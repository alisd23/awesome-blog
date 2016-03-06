import { UPDATE_LOCATION } from 'react-router-redux';
import Article from '../../Objects/Article';

// Action constants
const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

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
  switch (action.type) {
    case RECEIVE_ARTICLES: {
      const { articles } = action;
      const newArticles = {}
      articles.forEach((post) => {
        newArticles[post.id] = new Article(post);
      });
      // Merge the bloposts as to not duplicate posts
      return {
        ...state,
        ...newArticles
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
 * Action creator for receving new articles
 * @return {Object}   - Receive Articles action
 */
export function receiveArticles() {
  return {
    type: RECEIVE_ARTICLES
  };
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
