import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { routeActions, push } from 'react-router-redux';

import NavbarComponent from './Navbar';
import { SOLID, TRANSPARENT} from './NavbarTypes';
import screenSizes from '../../utils/screenSizes';

const links = [
  {
    title: 'Home',
    path: '/'
  }
]

@connect(mapStateToProps)
export default class NavbarContainer extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    location: React.PropTypes.object,
    user: React.PropTypes.object,
    offTop: React.PropTypes.bool,
    mobileNavOpen: React.PropTypes.bool
  }

  render() {
    const { user, type, offTop, location, dispatch, mobileNavOpen, pageLoading } = this.props;
    const notMobile = typeof window === 'undefined'
      || document.body.clientWidth > screenSizes.xs.max;
    return (
      <NavbarComponent
        clickNavLink={(route) => dispatch(push(route))}
        location={location}
        links={links}
        user={user}
        mobileNavOpen={mobileNavOpen}
        type={(offTop && notMobile) || mobileNavOpen ? SOLID : type}
        pageLoading={pageLoading}
        offTop={notMobile ? offTop : 'false'} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user,
    type: state.global.navbarType,
    offTop: state.global.offTop,
    mobileNavOpen: state.global.mobileNavOpen,
    pageLoading: state.global.pageLoading
  }
}
