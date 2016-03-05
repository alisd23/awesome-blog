import React from 'react';
import HeadlineAuthor from './HeadlineAuthor';
import HeadlineArticle from './HeadlineArticle';

const HeadlineComponent = ({ article, author, onReadArticle }) => (
  <div className="headline-banner article-banner">

    {/* Headline Article (bit with the large image) */}
    <HeadlineArticle article={article} author={author} onReadArticle={onReadArticle} />

    {/* Headline Author component */}
    <HeadlineAuthor author={author} />
  </div>
);

export default HeadlineComponent;
