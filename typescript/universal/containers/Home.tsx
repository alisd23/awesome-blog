import * as React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import PageLoader from '../components/PageLoader';
import IAppState from '../interfaces/AppState';
import config from '../../config';
const Helmet = require('react-helmet');


interface IHomeProps {
  location?: HistoryModule.Location; // React router gives this to us
  loading?: boolean;
}

class Home extends React.Component<IHomeProps, {}> {

  render() : React.ReactElement<{}> {
    // Import styles
    // require('../../../sass/common.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <h1>Home Page</h1>
      </div>
    )
  }
}

function mapStateToProps(state: IAppState) {
  return {
    loading: state.global.loading
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)
