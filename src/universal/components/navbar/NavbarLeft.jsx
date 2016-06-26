import React from 'react';
import classnames from 'classnames';
import { SOLID, TRANSPARENT} from './NavbarTypes';

const NavbarLeftComponent = ({ clickNavLink, links, location, type }) => {

  const tealLogo = require('../../../../assets/images/teal_logo.png');
  const whiteLogo = require('../../../../assets/images/white_logo.png');

  const linkClass = type === SOLID ? 'link-accent' : 'link-accent-white';
  const buttonClass = type === SOLID ? 'btn-primary-outline' : 'btn-white-accent';

  return (
    <div className='nav-left flex'>
      <a className='logo' onClick={() => clickNavLink('/')}>
        {
          type === SOLID
            ? <img src={tealLogo} key={0} />
            : <img src={whiteLogo} key={1} />
        }
      </a>
      <ul className='links nav'>
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
  );
}

export default NavbarLeftComponent;
