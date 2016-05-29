import React from 'react';
import GeminiScrollbar  from 'react-gemini-scrollbar';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navbar from './navbar/Navbar';
import Footer from '../components/Footer';
import Modals from './Modals';
import { scrolled } from '../redux/ducks/global';

// Can call just like this with babel resolver plugin
import 'app.scss';

@connect(mapStateToProps)
export default class App extends React.Component {
  static propTypes = {
    location: React.PropTypes.object, // react-redux-router gives this to us
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
    document.body.addEventListener('scroll', onScroll);

    // Listen for History location events and scroll to top on change
    // NOTE - DEPRECATED as of react-router 2.0.0
    this.props.history.listen(() => {
      this.refs.scrollbar.refs['scroll-view'].scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }

  render() {
    const { location, children } = this.props;
    return (
      <div id="app">
        <GeminiScrollbar ref="scrollbar" autoshow={true}>
          <Navbar location={location} />
          <Modals />
          <div id="main">
            { children }
          </div>
          <Footer />
        </GeminiScrollbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.global.loading
  }
}
