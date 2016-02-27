import React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import PageLoader from '../components/PageLoader';
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
        <h1>Home Page</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)
