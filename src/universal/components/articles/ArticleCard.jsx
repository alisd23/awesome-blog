import React from 'react';

const ArticleCardComponent = ({ article, author }) => (
  <div className="article-wrapper col-lg-12 col-xs-24" key={article.id}>
    <div className="article-card column">
      <div className="article-header flex-static flex center-a">
        <div className="article-image cover img-cover img-tint"
             style={{backgroundImage: `url(${article.imageURL})`}}></div>
        <div className="content">
          <h2 className="article-title small-caps text-white text-center">
            {article.title}
          </h2>
        </div>
        <div className="read-action flex center-a small-caps">See article</div>
      </div>
      <div className="article-content column flex-expand">
        <div className="article-author flex-static flex row-center">
          <a className="link-accent-light flex-expand">{author.fullname}</a>
          <div className="avatar text-overflow img-cover img-circle"
               style={{backgroundImage: `url(${author.avatarURL})`}}>
          </div>
          <span className="text-light small">{article.createdFuzzy}</span>
        </div>
        <div className="article-blurb">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleCardComponent;
