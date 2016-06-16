import React from 'react';
import { connect } from 'react-redux'
import HomePageComponent from './Home';
import { mixin } from 'core-decorators';
import { NavbarSolid } from '../../components/navbar/navbarMixins';
import { getHeadlineArticle, getNonHeadlineArticles } from '../../redux/ducks/articles';
import config from '../../head.config';
import Helmet from 'react-helmet';

@connect(mapStateToProps)
@mixin(NavbarSolid)
export default class HomeContainer extends React.Component {
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
        <Helmet {...config} title="Awesome Blog"/>
        <HomePageComponent
          otherArticles={this.props.otherArticles}
          headlineArticle={this.props.headlineArticle} />
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    loading: state.global.loading,
    otherArticles: getNonHeadlineArticles(state),
    headlineArticle: getHeadlineArticle(state)
  }
}
