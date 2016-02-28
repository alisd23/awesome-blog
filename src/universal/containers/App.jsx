import React from 'react';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Navbar from './Navbar';
import PageLoader from '../components/PageLoader';
import config from '../../config';
import Helmet from 'react-helmet';

// Can call just like this with babel resolver plugin
import 'app.scss';

class App extends React.Component {
  static propTypes = {
    clickNavLink: React.PropTypes.element,
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
        <Navbar />
        { this.props.children }
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    loading: state.global.loading
  }
}

export default connect(
  mapStateToProps,
  null
)(App)
