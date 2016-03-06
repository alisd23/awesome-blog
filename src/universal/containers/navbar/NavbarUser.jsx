import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { logout } from '../../redux/ducks/auth';

@connect()
export default class NavbarUserComponent extends React.Component {
  state = {
    open: false
  }

  render() {
    const { user, linkClass, dispatch } = this.props;

    return (
        <div className="nav-user flex row-center dropdown open">
          <div
            className={classnames(
              user.avatar ? '' : 'no-avatar',
              "avatar img-cover img-circle flex-static"
            )}
            style={{backgroundImage: `url(${user.avatarURL})`}}>
          </div>

          <a
            onClick={() => this.toggleDropdown()}
            className={classnames('text-truncate flex-expand dropdown-toggle', linkClass)}>
            <span className="flex row-center">
              {user.fullname}
              <i className="icon material-icons m-l-sm">keyboard_arrow_down</i>
            </span>
          </a>

          <ReactCSSTransitionGroup
            transitionName="dropdown"
            transitionEnterTimeout={350}
            transitionLeaveTimeout={350} >
            {
              this.state.open &&
                <div
                  className="dropdown-menu dropdown-menu-right"
                  onClick={() => this.toggleDropdown(false)}>
                  <a className="dropdown-item" onClick={() => dispatch(logout())}>Logout</a>
                  {
                    user.isAuthor &&
                      <a className="dropdown-item">Create Blog post</a>
                  }
                </div>
            }
          </ReactCSSTransitionGroup>
        </div>
    );
  }

  toggleDropdown(state) {
    this.setState({ open: state != null ? state : !this.state.open });
  }
}
