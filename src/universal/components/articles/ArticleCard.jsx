import React from 'react';

const ArticleCardComponent = ({ article, author }) => (
  <div className="article-wrapper col-sm-12" key={article.id}>
    <div className="article">
      <div className="article-image"
           style={{backgroundImage: `url(${article.imageURL})`}}></div>
      <h4>{article.title}</h4>
      <p>{article.content}</p>
    </div>
  </div>
);

export default ArticleCardComponent;
