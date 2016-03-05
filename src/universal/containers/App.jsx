import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import PageLoader from '../components/PageLoader';
import config from '../../config';
import Helmet from 'react-helmet';

// Can call just like this with babel resolver plugin
import 'app.scss';

@connect(mapStateToProps)
export default class App extends React.Component {
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
        <div id="app">
          { this.props.children }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    loading: state.global.loading
  }
}
