import React from 'react';
import Headline from '../../components/headline/HeadlineContainer';
import ArticleGrid from '../../components/article/ArticleGrid';

const HomeComponent = ({ headlineArticle, otherArticles }) => {
  return (
    <div id="home-page">
      {
        headlineArticle &&
          <Headline article={headlineArticle} />
      }
      <section className="articles-section">
        <ArticleGrid articles={otherArticles} />
      </section>
    </div>
  );
}
export default HomeComponent;
