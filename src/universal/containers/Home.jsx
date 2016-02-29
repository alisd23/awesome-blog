import React from 'react';
import { connect } from 'react-redux'
import HomePageComponent from '../components/Home';
import { getArticlesArray } from '../redux/ducks/articles';
import config from '../../config';
import Helmet from 'react-helmet';


class Home extends React.Component {
  static propTypes = {
    location: React.PropTypes.object, // React router gives this to us
    loading: React.PropTypes.bool,
  }
  static defaultProps = {
    location: '/'
  }

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        <HomePageComponent articles={this.props.articles} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading,
    articles: getArticlesArray(state.articles)
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)
