import React from 'react';
import HeadlineContainer from '../containers/articles/Headline';
import ArticleGridComponent from './articles/ArticleGrid';

const HomeComponent = ({ headlineArticle, otherArticles }) => (

  <div id="home-page">
    {
      headlineArticle &&
        <HeadlineContainer article={headlineArticle} />
    }
    {
      <ArticleGridComponent articles={otherArticles} />
    }
  </div>

);

export default HomeComponent;
