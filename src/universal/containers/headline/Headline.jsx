import React from 'react';
import HeadlineComponent from '../../components/headline/Headline';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toggleArticleLike } from '../../redux/ducks/articles';

@connect(mapStateToProps)
export default class HeadlineContainer extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object,
    dispatch: React.PropTypes.object,
    loggedIn: React.PropTypes.bool
  }

  render() {
    const { author, article, dispatch, loggedIn } = this.props;
    return article && (
      <HeadlineComponent
        article={article}
        author={author}
        onReadArticle={() => dispatch(push(`/article/${article.id}`))} />
    )
  }
}

function mapStateToProps(state: AppState, ownProps) {
  return {
    author: state.authors[ownProps.article.author],
    loggedIn: state.auth.user != null
  }
}
