import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { connect } from 'react-redux';

import NavActions from './NavActions';
import HamburgerMenu from './HamburgerMenu';
import MobileMenu from '../mobile-menu/MobileMenu';
import { toggleMobileNav, openModal } from '../../redux/ducks/global';
import Modals from '../modals/ModalTypes';

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  mobileNavOpen: state.global.mobileNavOpen
});
const mapDispatchToProps = { openModal, toggleMobileNav };

@connect(mapStateToProps, mapDispatchToProps)
export default class NavbarRightContainer extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    user: React.PropTypes.object,
    mobileNavOpen: React.PropTypes.bool,
    openModal: React.PropTypes.func,
    toggleMobileNav: React.PropTypes.func,
  }

  render() {
    const { user, type, mobileNavOpen, openModal, toggleMobileNav } = this.props;
    return (
      <div className='nav-right'>

        <NavActions
          user={user}
          type={type}
          onLoginClicked={() => openModal(Modals.LOGIN)}
          onRegisterClicked={() => openModal(Modals.REGISTER)} />

        <HamburgerMenu
          mobileNavOpen={mobileNavOpen}
          toggleMenu={() => toggleMobileNav()} />

        <ReactCSSTransitionGroup
          transitionName='menu-slide'
          transitionEnterTimeout={350}
          transitionLeaveTimeout={350}
        >
          {
            mobileNavOpen &&
              <MobileMenu />
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
