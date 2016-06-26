import React from 'react';
import { withRouter } from 'react-router';
import GeminiScrollbar  from 'react-gemini-scrollbar';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navbar from './navbar/NavbarContainer';
import Footer from './footer/Footer';
import Modals from './modals/AllModals';
import { scrolled } from '../redux/ducks/global';

// Use babel resolveDirs
import 'universal/sass/app.scss';

@connect(mapStateToProps)
@withRouter
export default class App extends React.Component {
  static propTypes = {
    location: React.PropTypes.object,
    loading: React.PropTypes.bool,
  }

  componentDidMount() {
    const { router, dispatch } = this.props;

    const onScroll = (e) => {
      dispatch(scrolled(e.currentTarget.scrollTop));
    }
    const onPageChange = (e) => {
      this.refs.scrollbar.refs['scroll-view'].scrollTop = 0;
      document.body.scrollTop = 0;
    }
    this.refs.scrollbar.refs['scroll-view'].addEventListener('scroll', onScroll);
    document.body.addEventListener('scroll', onScroll);

    // Listen for router change events and scroll to top
    router.listen(onPageChange);
  }

  render() {
    const { location, children } = this.props;
    return (
      <div id='app'>
        <GeminiScrollbar ref='scrollbar' autoshow={true}>
          <Navbar location={location} />
          <Modals />
          <div id='main'>
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
