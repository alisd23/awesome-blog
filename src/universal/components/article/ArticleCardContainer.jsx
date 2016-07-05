import React from 'react';
import ArticleCardComponent from './ArticleCard';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  author: state.authors[ownProps.article.author]
});
const mapDispatchToProps = { push };

@connect(mapStateToProps, mapDispatchToProps)
export default class ArticleCard extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object,
    push: React.PropTypes.func
  }
  static defaultProps = {
    article: null,
    author: null
  }

  render() {
    const { article, author, push } = this.props;
    return (
      <ArticleCardComponent
        article={article}
        author={author}
        onReadArticle={() => push(`/article/${article.id}`)}/>
    )
  }
}
