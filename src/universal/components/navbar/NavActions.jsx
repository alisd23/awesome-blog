import React from 'react';
import classnames from 'classnames';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

const NavbarActionsComponent = ({ user, type }) => {

  const linkClass = type === SOLID ? 'link-accent' : 'link-accent-white';
  const buttonClass = type === SOLID ? 'btn-primary-outline' : 'btn-white-accent';

  return (
    <div className="regular">
      {
        user
          ?
            <div className="nav-user flex row-center">
              <a className={classnames('text-truncate flex-expand', linkClass)}>
                {user.fullname}
              </a>
              <div className="avatar img-cover img-circle flex-static"
                   style={{backgroundImage: `url(${user.avatarURL})`}}>
              </div>
            </div>
          :
            <div className="nav-actions flex row-center">
              <a className={classnames('strong small-caps m-r-lg', linkClass)}>Login</a>
              <a href="https://www.fruks.com/register"
                 className={classnames('btn btn-caps strong', buttonClass)}>
                Join Fruks
              </a>
            </div>
      }
    </div>
  );
}

export default NavbarActionsComponent;
