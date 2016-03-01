import { UPDATE_LOCATION } from 'react-router-redux';
import Article from '../../Objects/Article';

const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

const initialState = {
  articles: {}
}

//----------------------------//
//           Handler          //
//----------------------------//

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

export function getArticlesArray(articles) {
  return Object.keys(articles).map((k) => articles[k]);
}
export function getHeadlineArticle(articles) {
  return getArticlesArray(articles)[0]
}
export function getNonHeadlineArticles(articles) {
  return getArticlesArray(articles).filter((a, i) => i > 0);
}
