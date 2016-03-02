import React from 'react';
import ArticleCardComponent from '../../components/articles/ArticleCard';
import { connect } from 'react-redux';

@connect(mapStateToProps)
export default class ArticleCard extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }
  static defaultProps = {
    article: null,
    author: null
  }

  render() {
    const { article, author } = this.props;
    return (
      <ArticleCardComponent article={article} author={author} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    author: state.authors[ownProps.article.author]
  }
}
