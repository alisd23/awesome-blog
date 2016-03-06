import React from 'react';

const ArticleBodyComponent = ({ article, author }) => (
  <div className="article-body container">
    <div className="user-info flex row-center">
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
    <div className="article-content lead">
      { article.content }
    </div>

  </div>
);

export default ArticleBodyComponent;
