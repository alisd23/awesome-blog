import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { toggleMobileNav, openModal } from '../../redux/ducks/global';
import Modals from '../../constants/Modals';
import { logout } from '../../redux/ducks/auth';
import config from '../../../server/config';

@connect(mapStateToProps)
export default class MobileMenuContainer extends React.Component {

  render() {
    const { closeMenu, user, dispatch } = this.props;

    return (
      <div className="mobile-menu">
        <div className="backdrop"
          onClick={() => dispatch(toggleMobileNav(false))}></div>
        <div className="menu">
          {
            user
              ?
                <div className="menu-content cover column row-xs-center">
                  <div className="avatar img-cover img-circle m-b-md"
                    style={{backgroundImage: `url(${user.avatarURL})`}}>
                  </div>
                  <h5>{user.fullname}</h5>
                  <div className="link-accent p-a-md"
                    onClick={() => dispatch(logout())}>Logout</div>
                  <a className="btn btn-block btn-lg btn-primary-outline btn-caps m-t-md"
                      href={`${config.fruks_web_hostname}`}>Go to fruks</a>
                </div>
              :
                <div className="menu-content cover column center-a">
                  <a className="btn btn-block btn-lg btn-secondary btn-caps"
                    onClick={::this.loginClicked}>Login</a>
                  <h6 className="small-caps m-y-md text-xs-center text-muted">OR</h6>
                  <a className="btn btn-block btn-lg btn-primary-outline btn-caps"
                    href={`${config.fruks_web_hostname}/register`}>Join Fruks</a>
                </div>
          }
        </div>
      </div>
    );
  }

  loginClicked() {
    this.props.dispatch(toggleMobileNav(false));
    this.props.dispatch(openModal(Modals.LOGIN));
  }

}


function mapStateToProps(state: AppState, ownProps) {
  return {
    user: state.auth.user
  }
}
