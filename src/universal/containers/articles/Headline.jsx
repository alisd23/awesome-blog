import React from 'react';
import HeadlineComponent from '../../components/articles/Headline';
import { connect } from 'react-redux';

class HeadlineContainer extends React.Component {
  static propTypes = {
    article: React.PropTypes.object,
    author: React.PropTypes.object
  }
  static defaultProps = {
    article: null,
    author: null
  }

  render() {
    return (
      <HeadlineComponent
        article={this.props.article}
        author={this.props.author} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    author: state.authors[ownProps.article.author]
  }
}

export default connect(
  mapStateToProps,
  null
)(HeadlineContainer)
