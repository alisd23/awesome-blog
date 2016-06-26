import React from 'react';
import { getArticleImageURL, getArticleCreatedFuzzy } from '../../helpers/article';
import { getFullname, getAvatarURL } from '../../helpers/user';

const ArticleCardComponent = ({ article, author, onReadArticle }) => (
  <div className='article-wrapper col-lg-12 col-xs-24' key={article.id}>
    <div className='article-card column'>
      <div className='article-header flex-static flex center-a' onClick={onReadArticle}>
        <div className='article-image cover img-cover img-tint'
             style={{backgroundImage: `url(${getArticleImageURL(article)})`}}></div>
        <div className='content'>
          <h2 className='article-title small-caps text-white text-center'>
            {article.title}
          </h2>
          {
            article.meta.likes.length > 0 &&
              <div className='likes-display animate'>
                <i className='icon material-icons md-36'>thumb_up</i>
                <div className='count m-l-sm'>{article.meta.likes.length}</div>
              </div>
          }
        </div>
        <div className='read-action flex center-a small-caps'>See article</div>
      </div>
      <div className='article-content column flex-expand'>
        <div className='article-author flex-static flex row-center'>
          <span className='text-muted text-truncate flex-expand'>{getFullname(author)}</span>
          <div className='avatar img-cover img-circle'
               style={{backgroundImage: `url(${getAvatarURL(author)})`}}>
          </div>
          <span className='text-light small m-l-sm'>{getArticleCreatedFuzzy(article)}</span>
        </div>
        <div className='article-blurb'>
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleCardComponent;
