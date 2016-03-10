import React from 'react';
import LikeButton from './LikeButton';

const ArticleBodyComponent = ({ article, author, user, isLiked, handleLike }) => (
  <div className="article-body container">

    {/* Author info */}
    <div className="article-body-top flex row-center flex-wrap">
      <div className="flex row-center flex-expand">
        <div className="avatar img-cover img-circle"
             style={{backgroundImage: `url(${author.avatarURL})`}}>
        </div>
        <div className="user-details flex-expand m-l-md">
          <h5 className="m-a-0 text-muted"><span>{author.fullname}</span></h5>
          {
            author.twitter &&
              <div className="m-t-sm">
                <a href={author.twitterURL} className="link-twitter text-truncate">@{author.twitter}</a>
              </div>
          }
        </div>
      </div>

      {/* Like button */}
      <LikeButton
        user={user}
        isLiked={isLiked}
        article={article}
        handleLike={handleLike} />

    </div>
    <div className="article-content lead">
      { article.content }
    </div>

  </div>
);

export default ArticleBodyComponent;
