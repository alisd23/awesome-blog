import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

import NavbarRight from '../../containers/navbar/NavbarRight';
import NavbarLeft from './NavbarLeft';

const NavbarComponent = ({
  clickNavLink,
  location,
  links,
  user,
  type,
  offTop,
  mobileNavOpen
}) => {
  const navbarClass = classnames(
    type === SOLID ? 'navbar-solid' : 'navbar-transparent',
    {
      'off-top': offTop === true,
      'fixed': mobileNavOpen
    },
  );

  return (
    <div className={classnames('navbar-container', navbarClass)}>
      <div className="container">
        <nav className="navbar">

          <NavbarLeft
            clickNavLink={clickNavLink}
            links={links}
            location={location}
            type={type} />

          <NavbarRight
            type={type}
            user={user} />

        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
