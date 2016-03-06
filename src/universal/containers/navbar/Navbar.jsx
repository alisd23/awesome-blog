import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { routeActions, push } from 'react-router-redux';

import NavbarComponent from '../../components/navbar/Navbar';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';
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
    const { user, type, offTop, location, dispatch, mobileNavOpen } = this.props;
    const notMobile = typeof window === 'undefined'
      || window.screen.width > screenSizes.xs.max;
    return (
      <NavbarComponent
        clickNavLink={(route) => dispatch(push(route))}
        location={location}
        links={links}
        user={user}
        mobileNavOpen={mobileNavOpen}
        type={offTop && notMobile ? SOLID : type}
        offTop={notMobile ? offTop : 'false'}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user,
    type: state.global.navbarType,
    offTop: state.global.offTop,
    mobileNavOpen: state.global.mobileNavOpen
  }
}
