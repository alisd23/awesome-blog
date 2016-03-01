import React from 'react';
import MediaQuery from 'react-responsive';
import screens from '../../utils/screenSizes';

export default class HeadlineComponent extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }
  static defaultProps = {
    article: null,
    author: null
  }

  render() {
    const article = this.props.article;
    const author = this.props.author;

    const ArticleAction = (
      <div className="btn btn-white-accent btn-transition">
        <span className="text small-caps">Read Article</span>
        <i className="icon material-icons">local_library</i>
      </div>
    );

    return article &&
      (
        <div className="headline-banner">
          <div className="headline-article center-a article flex-static">
            <div className="article-content column">
              <div className="article-image cover"
                   style={{backgroundImage: `url(${article.imageURL})`}}></div>
              <div className="article-top flex">
                <h1 className="article-title small-caps flex-expand">{article.title}</h1>
                <MediaQuery minWidth={screens.md.min} values={{minWidth: screens.xl.min}}>
                  <div className="article-action flex-static center-a m-l-md">
                    { ArticleAction }
                  </div>
                </MediaQuery>
              </div>
              <div className="article-details flex">
                <h3 className="article-by">
                  <span>By </span>
                  <a className="link-accent-light"><strong>{author.fullname}</strong></a>
                </h3>
                <h5 className="article-date">{article.createdPretty}</h5>
              </div>
              {/* Only show button down here if we are on mobile */}
              <MediaQuery maxWidth={screens.sm.max}>
                <div className="article-action mobile center-a m-t-lg">
                  { ArticleAction }
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className="author center-a flex-expand">
          {
            author
              ?
                (
                  <div className="author-content center-a column">
                    <div className="avatar background-cover img-circle"
                         style={{backgroundImage: `url(${author.avatarURL})`}}></div>
                    <h2 className="m-y-md">{author.fullname}</h2>
                  </div>
                )
              :
                (
                  <div>
                    <h4>Author not found :(</h4>
                  </div>
                )
          }
          </div>
        </div>
      )
  }
}
