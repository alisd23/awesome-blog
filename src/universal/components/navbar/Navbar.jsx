import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import { SOLID, TRANSPARENT} from '../../constants/NavbarTypes';

const NavbarComponent = ({ clickNavLink, location, links, user, type, offTop }) => {

  const tealLogo = require('../../../../assets/images/teal_logo.png');
  const whiteLogo = require('../../../../assets/images/white_logo.png');

  const navbarClass = classnames(
    type === SOLID ? 'navbar-solid' : 'navbar-transparent',
    { 'off-top': offTop }
  );
  const linkClass = type === SOLID ? 'link-accent' : 'link-accent-white';
  const buttonClass = type === SOLID ? 'btn-primary-outline' : 'btn-white-accent';

  return (
    <div className={classnames('navbar-container', navbarClass)}>
      <div className="container">
        <nav className="navbar">
          <div className="nav-left flex">
            <a className="logo" onClick={() => clickNavLink('/')}>
              {
                type === SOLID
                  ? <img src={tealLogo} key={0} />
                  : <img src={whiteLogo} key={1} />
              }
            </a>
            <ul className="links nav">
            {
              links.map((link) => {
                const itemClasses = classnames(
                  {
                    'active': link.path === (location && location.pathname)
                  },
                  'nav-item'
                );
                return (
                  <li className={itemClasses} key={link.title}>
                    <a className={classnames('nav-link small-caps', linkClass)}
                       onClick={() => clickNavLink(link.path)}>
                      {link.title}
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </div>
          <div className="nav-right">
            <ul className="nav">
              {
                user
                  ?
                    <div className="nav-user flex row-center">
                      <a className={classnames('text-truncate flex-expand', linkClass)}>{user.fullname}</a>
                      <div className="avatar img-cover img-circle flex-static"
                           style={{backgroundImage: `url(${user.avatarURL})`}}>
                      </div>
                    </div>
                  :
                    <div className="nav-actions flex row-center">
                      <a className={classnames('strong small-caps m-r-lg', linkClass)}>Login</a>
                      <div className={classnames('btn  btn-caps strong', buttonClass)}>Join Fruks</div>
                    </div>
              }
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
