import React from 'react';
import HeadlineContainer from '../containers/articles/Headline';
import ArticleGridComponent from './articles/ArticleGrid';

const HomeComponent = ({ headlineArticle, otherArticles }) => (

  <div id="home-page">
    {
      headlineArticle &&
        <HeadlineContainer article={headlineArticle} />
    }
    <section className="articles-section">
      <ArticleGridComponent articles={otherArticles} />
    </section>
  </div>

);

export default HomeComponent;
