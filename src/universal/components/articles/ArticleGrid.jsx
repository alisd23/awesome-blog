import React from 'react';
import ArticleCardContainer from '../../containers/articles/ArticleCard';

const ArticleGridComponent = ({ articles }) => (
  <section className="container">
    <div className="articles-grid flex flex-wrap">
      {
        articles.map((article: Article) =>
          <ArticleCardContainer article={article} key={article.id} />
        )
      }
    </div>
  </section>
);

export default ArticleGridComponent;
