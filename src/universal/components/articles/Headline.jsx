import React from 'react';
import HeadlineAuthor from './HeadlineAuthor';
import HeadlineArticle from './HeadlineArticle';

const HeadlineComponent = ({ article, author }) => (
  <div className="headline-banner">

    {/* Headline Article (bit with the large image) */}
    <HeadlineArticle article={article} author={author} />

    {/* Headline Author component */}
    <HeadlineAuthor author={author} />
  </div>
);

export default HeadlineComponent;
