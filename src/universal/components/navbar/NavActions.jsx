import React from 'react';
import classnames from 'classnames';
import NavbarUser from '../../containers/navbar/NavbarUser';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

const NavbarActionsComponent = ({ user, type, onLoginClicked }) => {

  const linkClass = type === SOLID ? 'link-accent' : 'link-accent-white';
  const buttonClass = type === SOLID ? 'btn-primary-outline' : 'btn-white-accent';

  return (
    <div className="regular">
      {
        user
          ?
            <NavbarUser user={user} linkClass={linkClass} />
          :
            <div className="nav-actions flex row-center">
              <a onClick={onLoginClicked}
                className={classnames('strong small-caps m-r-lg', linkClass)}>
                 Login
               </a>
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
