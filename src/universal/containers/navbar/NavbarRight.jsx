import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { connect } from 'react-redux';

import NavActions from '../../components/navbar/NavActions';
import HamburgerMenu from '../../components/navbar/HamburgerMenu';
import MobileMenu from '../../components/MobileMenu';
import { toggleMobileNav } from '../../redux/ducks/global';

@connect(mapStateToProps)
export default class NavbarRightContainer extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    user: React.PropTypes.object,
    mobileNavOpen: React.PropTypes.bool
  }

  render() {
    const { user, type, mobileNavOpen, dispatch } = this.props;
    return (
      <div className="nav-right">

        <NavActions
          user={user}
          type={type} />

        <HamburgerMenu
          mobileNavOpen={mobileNavOpen}
          toggleMenu={() => dispatch(toggleMobileNav())} />

        <ReactCSSTransitionGroup
          transitionName='menu-slide'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {
            mobileNavOpen &&
              <MobileMenu
                closeMenu={() => dispatch(toggleMobileNav(false))} />
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user,
    type: state.global.navbarType,
    mobileNavOpen: state.global.mobileNavOpen
  }
}
