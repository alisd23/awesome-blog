import React from 'react';
import MediaQuery from 'react-responsive';

const HeadlineAuthorComponent = ({ author }) => (
  <div className="author center-a flex-static">
    {
      author
        ?
          <div className="author-content center-a column">
            <div className="avatar background-cover img-circle"
                 style={{backgroundImage: `url(${author.avatarURL})`}}></div>
            <h2 className="m-y-md">{author.fullname}</h2>
          </div>
        :
          <div>
            <h4>Author not found</h4>
          </div>
    }
  </div>
);

export default HeadlineAuthorComponent;
