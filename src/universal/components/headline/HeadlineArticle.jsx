import React from 'react';

const HeadlineArticleComponent = ({ article, author, onReadArticle }) => (

  <div className="headline-article article flex">
    <div className="article-inner column container">
      {/* Image */}
      <div className="article-image cover img-cover img-tint"
           style={{backgroundImage: `url(${article.imageURL})`}}></div>

      {/* Article TITLE and action button*/}
      <div className="article-content flex flex-wrap">
        <h1 className="article-title small-caps flex-expand">{article.title}</h1>
        {
          onReadArticle &&
            <div className="article-action flex-static center-a">
              <a className="btn btn-white-accent btn-transition" onClick={onReadArticle}>
                <span className="text small-caps">Read Article</span>
                <i className="icon material-icons">local_library</i>
              </a>
            </div>
        }

        {/* Article DETAILS*/}
        <div className="article-details flex">
          <h3 className="article-by">
            <span>By </span>
            <span className="text-light"><strong>{author.fullname}</strong></span>
          </h3>
          <h5 className="article-date">{article.createdPretty}</h5>
        </div>
      </div>
    </div>
  </div>
);

export default HeadlineArticleComponent;