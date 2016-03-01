import React from 'react';
import { connect } from 'react-redux'
import HomePageComponent from '../components/Home';
import { getHeadlineArticle, getNonHeadlineArticles } from '../redux/ducks/articles';
import config from '../../config';
import Helmet from 'react-helmet';

class HomeContainer extends React.Component {
  static propTypes = {
    location: React.PropTypes.object, // React router gives this to us
    loading: React.PropTypes.bool,
    headlineArticle: React.PropTypes.object,
    otherArticles: React.PropTypes.array
  }
  static defaultProps = {
    location: '/'
  }

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        <HomePageComponent
          otherArticles={this.props.otherArticles}
          headlineArticle={this.props.headlineArticle} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    otherArticles: getNonHeadlineArticles(state.articles),
    headlineArticle: getHeadlineArticle(state.articles)
  }
}

export default connect(
  mapStateToProps,
  null
)(HomeContainer)
