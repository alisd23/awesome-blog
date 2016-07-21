import React from 'react';
import { withRouter } from 'react-router';
import GeminiScrollbar  from 'react-gemini-scrollbar';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navbar from './navbar/NavbarContainer';
import Footer from './footer/Footer';
import Modals from './modals/AllModals';
import AlertsContainer from './alerts/AlertsContainer';
import { scrolled } from '../redux/ducks/global';

// Use babel resolveDirs
import 'universal/sass/app.scss';

const mapStateToProps = (state) => ({
  loading: state.global.loading
});
const mapDispatchToProps = { scrolled };

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
export default class App extends React.Component {
  static propTypes = {
    location: React.PropTypes.object,
    loading: React.PropTypes.bool,
  }

  componentDidMount() {
    const { router, scrolled } = this.props;

    const onScroll = (e) => {
      console.log('Scrolled', e.currentTarget.scrollTop || e.currentTarget.scrollY);
      scrolled(e.currentTarget.scrollTop || e.currentTarget.scrollY);
    }
    const onPageChange = (e) => {
      this.refs.scrollbar.refs['scroll-view'].scrollTop = 0;
      document.body.scrollTop = 0;
    }
    this.refs.scrollbar.refs['scroll-view'].addEventListener('scroll', onScroll);
    document.body.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

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
          <AlertsContainer />
          <div id='main'>
            { children }
          </div>
          <Footer />
        </GeminiScrollbar>
      </div>
    )
  }
}
