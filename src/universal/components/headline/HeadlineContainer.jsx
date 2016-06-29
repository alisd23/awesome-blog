import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import HeadlineComponent from './Headline';
import { toggleArticleLike } from '../../redux/ducks/articles';

const mapStateToProps = (state, ownProps) => ({
  author: state.authors[ownProps.article.author]
});
const mapDispatchToProps = { push };

@connect(mapStateToProps, mapDispatchToProps)
export default class HeadlineContainer extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object,
    push: React.PropTypes.func,
  }

  render() {
    const { author, article, push } = this.props;
    return article && (
      <HeadlineComponent
        article={article}
        author={author}
        onReadArticle={() => push(`/article/${article.id}`)} />
    )
  }
}
