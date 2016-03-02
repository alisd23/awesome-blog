import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import HeadlineAuthor from './HeadlineAuthor';
import HeadlineArticle from './HeadlineArticle';

const HeadlineComponent = ({ article, author }) => {

  return article &&
    (
      <div className="headline-banner">
        <ReactTransitionGroup component="div" className="headline-article flex article">
          <HeadlineArticle article={article} author={author} key={0} />
        </ReactTransitionGroup>
        {/* Headline Author component */}
        <HeadlineAuthor author={author} />
      </div>
    );
};

export default HeadlineComponent;
