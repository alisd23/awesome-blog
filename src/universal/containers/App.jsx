import React from 'react';
import GeminiScrollbar  from 'react-gemini-scrollbar';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navbar from './navbar/Navbar';
import PageLoader from '../components/PageLoader';
import config from '../../config';
import { scrolled } from '../redux/ducks/global';

// Can call just like this with babel resolver plugin
import 'app.scss';

@connect(mapStateToProps)
export default class App extends React.Component {
  static propTypes = {
    clickNavLink: React.PropTypes.element,
    location: React.PropTypes.object, // React router gives this to us
    loading: React.PropTypes.bool,
  }

  componentDidMount() {
    // Listen for scroll events, and fire off scroll action
    // NOTE Currently only fires on devices that use gemini scrollbar
    // i.e don't have an overlay scrollbar
    const onScroll = (e) => {
        this.props.dispatch(scrolled(e.currentTarget.scrollTop));
    }
    this.refs.scrollbar.refs['scroll-view'].addEventListener('scroll', onScroll);
    this.refs.app.addEventListener('scroll', onScroll);

    // Listen for History location events and scroll to top on change
    // NOTE - DEPRECATED as of react-router 2.0.0
    this.props.history.listen(() => {
      this.refs.scrollbar.refs['scroll-view'].scrollTop = 0;
      this.refs.app.scrollTop = 0;
    });
  }

  render() {
    return (
      <div id="app" className="cover" ref="app">
        <GeminiScrollbar ref="scrollbar" autoshow={true}>
          <Helmet {...config.app.head}/>
          <Navbar location={this.props.location} />
          <div id="main">
            { this.props.children }
          </div>
        </GeminiScrollbar>
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    loading: state.global.loading
  }
}
