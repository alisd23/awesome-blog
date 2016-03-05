import React from 'react';
import HeadlineContainer from '../containers/headline/Headline';
import ArticleGridComponent from './article/ArticleGrid';

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
