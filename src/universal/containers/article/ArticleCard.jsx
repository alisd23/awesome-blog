import React from 'react';
import ArticleCardComponent from '../../components/article/ArticleCard';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
    const { article, author, dispatch } = this.props;
    return (
      <ArticleCardComponent
        article={article}
        author={author}
        onReadArticle={() => dispatch(push(`/article/${article.id}`))}/>
    )
  }
}

function mapStateToProps(state: AppState, ownProps) {
  return {
    author: state.authors[ownProps.article.author]
  }
}
