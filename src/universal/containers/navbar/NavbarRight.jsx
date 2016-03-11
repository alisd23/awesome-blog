import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { connect } from 'react-redux';

import NavActions from '../../components/navbar/NavActions';
import HamburgerMenu from '../../components/navbar/HamburgerMenu';
import MobileMenu from '../../components/MobileMenu';
import { toggleMobileNav, openModal } from '../../redux/ducks/global';
import Modals from '../../constants/Modals';

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
          type={type}
          onLoginClicked={() => dispatch(openModal(Modals.LOGIN))} />

        <HamburgerMenu
          mobileNavOpen={mobileNavOpen}
          toggleMenu={() => dispatch(toggleMobileNav())} />

        <ReactCSSTransitionGroup
          transitionName='menu-slide'
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
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

function mapStateToProps(state: AppState, ownProps) {
  return {
    user: state.auth.user,
    mobileNavOpen: state.global.mobileNavOpen
  }
}
