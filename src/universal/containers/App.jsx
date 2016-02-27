import React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar';
import PageLoader from '../components/PageLoader';
import config from '../../config';
import Helmet from 'react-helmet';

//
// interface IAppProps {
//   children: React.ReactElement<any>;
//   location?: HistoryModule.Location; // React router gives this to us
//   loading?: boolean;
// }

class App extends React.Component {

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar />
        { this.props.children }
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
)(App)
