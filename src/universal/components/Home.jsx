import React from 'react';
import HeadlineContainer from '../containers/articles/Headline';

export default class HomeComponent extends React.Component {
  static propTypes = {
    otherArticles: React.PropTypes.array,
    headlineArticle: React.PropTypes.object
  }
  static defaultProps = {
    otherArticles: [],
    headlineArticle: null
  }

  render() {
    const headline = this.props.headlineArticle;
    const articles = this.props.otherArticles;

    return (
      <div id="home-page">
        {
          headline &&
            <HeadlineContainer article={headline} />
        }
        {
          articles.map((article: Article) =>
            <div key={article.id}>
              <img src={article.imageURL} />
              <h4>{article.title}</h4>
              <h4>{article.content}</h4>
            </div>
          )
        }
      </div>
    )
  }
}
