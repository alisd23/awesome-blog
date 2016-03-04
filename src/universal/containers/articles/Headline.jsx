import React from 'react';
import HeadlineComponent from '../../components/articles/Headline';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(mapStateToProps)
export default class HeadlineContainer extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }
  static defaultProps = {
    article: null,
    author: null
  }

  render() {
    const { author, article, dispatch } = this.props;
    return article && (
      <HeadlineComponent
        article={article}
        author={author}
        onReadArticle={() => dispatch(push(`/article/${article.id}`))} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    author: state.authors[ownProps.article.author]
  }
}
