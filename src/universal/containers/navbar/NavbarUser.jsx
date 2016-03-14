import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { logout } from '../../redux/ducks/auth';
import localConfig from '../../../server/local.config';
import Dropdown from '../Dropdown';

@connect()
export default class NavbarUserComponent extends React.Component {
  state = {
    open: false
  }

  render() {
    const { user, linkClass, dispatch } = this.props;

    return (
        <div className="nav-user flex row-center dropdown">
          <div
            className={classnames(
              user.avatar ? '' : 'no-avatar',
              "avatar img-cover img-circle flex-static"
            )}
            style={{backgroundImage: `url(${user.avatarURL})`}}>
          </div>

          <a
            ref="trigger"
            className={classnames('text-truncate flex-expand dropdown-toggle', linkClass)}>
            <span className="flex row-center">
              {user.fullname}
              <i className="icon material-icons m-l-sm">keyboard_arrow_down</i>
            </span>
          </a>

          <Dropdown
            getTrigger={() => this.refs.trigger}
            className="dropdown-menu-right">
            {/* Dropdown content */}
            <a className="dropdown-item text-primary" href={`${localConfig.fruks_web_hostname}`}>Go to Fruks</a>
            <a className="dropdown-item" onClick={() => dispatch(logout())}>Logout</a>
          </Dropdown>
        </div>
    );
  }
}
