import React from 'react';
import { connect } from 'react-redux'
import HeadlineArticleComponent from '../components/headline/HeadlineArticle';
import config from '../../config';
import Helmet from 'react-helmet';

@connect(mapStateToProps)
export default class ArticleContainer extends React.Component {
  static propTypes = {
    params: React.PropTypes.object, // React router gives this to us
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }

  render() {
    const { article, author } = this.props;

    return (
      <div id="article">
        <Helmet {...config.app.head}/>
        <div className="article-banner">
          <HeadlineArticleComponent author={author} article={article} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const article = state.articles[ownProps.params.id]
  return {
    article,
    author: state.authors[article.author],
  }
}
