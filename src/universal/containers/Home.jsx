import React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import PageLoader from '../components/PageLoader';
import config from '../../config';
import Helmet from 'react-helmet';

// interface IHomeProps {
//   location?: HistoryModule.Location; // React router gives this to us
//   loading?: boolean;
// }

class Home extends React.Component {

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
