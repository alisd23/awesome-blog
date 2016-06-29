import React from 'react';
import { connect } from 'react-redux'
import HomePageComponent from './Home';
import { mixin } from 'core-decorators';
import { SOLID } from '../../components/navbar/NavbarTypes';
import navbarType from '../../components/navbar/navbarTypeHOC';
import { getHeadlineArticle, getNonHeadlineArticles } from '../../redux/ducks/articles';
import config from '../../head.config';
import Helmet from 'react-helmet';

const mapStateToProps = (state) => ({
  otherArticles: getNonHeadlineArticles(state),
  headlineArticle: getHeadlineArticle(state)
});

@navbarType(SOLID)
@connect(mapStateToProps)
export default class HomeContainer extends React.Component {
  static propTypes = {
    headlineArticle: React.PropTypes.object,
    otherArticles: React.PropTypes.array,
  }

  render() {
    return (
      <div>
        <Helmet {...config} title='Awesome Blog'/>
        <HomePageComponent
          otherArticles={this.props.otherArticles}
          headlineArticle={this.props.headlineArticle} />
      </div>
    )
  }
}
