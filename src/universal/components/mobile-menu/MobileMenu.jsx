import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { toggleMobileNav, openModal } from '../../redux/ducks/global';
import { getAvatarURL, getFullname } from '../../helpers/user';
import ModalTypes from '../modals/ModalTypes';
import { logout } from '../../redux/ducks/auth';

@connect(mapStateToProps)
export default class MobileMenuContainer extends React.Component {

  render() {
    const { closeMenu, user, dispatch } = this.props;

    return (
      <div className='mobile-menu'>
        <div className='backdrop'
          onClick={() => dispatch(toggleMobileNav(false))}></div>
        <div className='menu'>
          {
            user
              ?
                <div className='menu-content cover column row-xs-center'>
                  <div className='avatar img-cover img-circle m-b-md'
                    style={{backgroundImage: `url(${getAvatarURL(user)})`}}>
                  </div>
                  <h5>{getFullname(user)}</h5>
                  <div className='link-accent p-a-md'
                    onClick={() => dispatch(logout())}>Logout</div>
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
    this.props.dispatch(toggleMobileNav(false));
    this.props.dispatch(openModal(ModalTypes.LOGIN));
  }

}


function mapStateToProps(state: AppState, ownProps) {
  return {
    user: state.auth.user
  }
}
