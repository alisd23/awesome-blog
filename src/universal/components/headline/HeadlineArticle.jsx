import React from 'react';
import { getArticleImageURL, getArticleCreatedPretty } from '../../helpers/article';
import { getFullname } from '../../helpers/user';

const HeadlineArticleComponent = ({ article, author, onReadArticle, showLikes }) => (

  <div className="headline-article article flex">
    <div className="article-inner column container">
      {/* Image */}
      <div className="article-image cover img-cover img-tint"
           style={{backgroundImage: `url(${getArticleImageURL(article)})`}}></div>

      {/* Article TITLE and action button*/}
      <div className="article-content flex flex-wrap">
        <h1 className="article-title small-caps flex-expand">{article.title}</h1>
        {
          onReadArticle &&
            <div className="article-action flex-static center-a">
              <a className="btn btn-white-accent btn-transition" onClick={onReadArticle}>
                <span className="text small-caps">Read Article</span>
                <div className="icon">
                  <i className="material-icons">local_library</i>
                </div>
              </a>
            </div>
        }

        {/* Article DETAILS*/}
        <div className="article-details flex">
          <h3 className="article-by">
            <span>By </span>
            <span className="text-light"><strong>{getFullname(author)}</strong></span>
          </h3>
          <h5 className="article-date">{getArticleCreatedPretty(article)}</h5>
        </div>
        {
          article.meta.likes.length > 0 && showLikes &&
            <div className="likes-display animate">
              <i className="icon material-icons md-36">thumb_up</i>
              <div className="count m-l-sm">{article.meta.likes.length}</div>
            </div>
        }
      </div>
    </div>
  </div>
);

export default HeadlineArticleComponent;
