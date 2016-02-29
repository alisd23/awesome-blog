import { UPDATE_LOCATION } from 'react-router-redux';
import Article from '../../Objects/Article';

const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

const initialState = {
  articles: []
}

//----------------------------//
//           Handler          //
//----------------------------//

export default function handle(state = initialState, action) {
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

export function getArticlesArray(articles) {
  return Object.keys(articles).map((k) => articles[k]);
}
