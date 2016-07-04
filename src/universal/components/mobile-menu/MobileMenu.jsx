import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { toggleMobileNav, openModal } from '../../redux/ducks/global';
import { getAvatarURL, getFullname } from '../../helpers/user';
import ModalTypes from '../modals/ModalTypes';
import { logout } from '../../redux/ducks/auth';

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user
});
const mapDispatchToProps = { toggleMobileNav, logout, openModal, push };

@connect(mapStateToProps, mapDispatchToProps)
export default class MobileMenuContainer extends React.Component {

  render() {
    const { closeMenu, user, logout, toggleMobileNav, push } = this.props;

    return (
      <div className='mobile-menu'>
        <div className='backdrop'
          onClick={() => toggleMobileNav(false)}></div>
        <div className='menu'>
          {
            user
              ?
                <div className='menu-content cover column row-xs-center'>
                  <div className='avatar img-cover img-circle m-b-md'
                    style={{backgroundImage: `url(${getAvatarURL(user)})`}}>
                  </div>
                  <h5 className='m-b-md'>{getFullname(user)}</h5>
                  <div
                    className='link-accent p-a-d'
                    onClick={logout}>
                    Logout
                  </div>
                  <div
                    className='link-accent p-a-d'
                    onClick={() => push('/account/profile')}>
                    Profile
                  </div>
                </div>
              :
                <div className='menu-content cover column center-a'>
                  <a className='btn btn-block btn-lg btn-secondary btn-caps'
                    onClick={::this.loginClicked}>Login</a>
                </div>
          }
        </div>
      </div>
    );
  }

  loginClicked() {
    this.props.toggleMobileNav(false);
    this.props.openModal(ModalTypes.LOGIN);
  }
}
