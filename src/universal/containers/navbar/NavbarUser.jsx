import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from '../../redux/ducks/auth';
import { getAvatarURL, getFullname } from '../../helpers/user';
import config from '../../../server/app.config';
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
            style={{backgroundImage: `url(${getAvatarURL(user)})`}}>
          </div>

          <a
            ref="trigger"
            className={classnames('text-truncate flex-expand dropdown-toggle', linkClass)}>
            <span className="flex row-center">
              {getFullname(user)}
              <i className="icon material-icons m-l-sm">keyboard_arrow_down</i>
            </span>
          </a>

          <Dropdown
            getTrigger={() => this.refs.trigger}
            className="dropdown-menu-right">
            {/* Dropdown content */}
            <a className="dropdown-item" onClick={() => dispatch(push('/account/profile'))}>Profile</a>
            <a className="dropdown-item" onClick={() => dispatch(logout())}>Logout</a>
          </Dropdown>
        </div>
    );
  }
}
