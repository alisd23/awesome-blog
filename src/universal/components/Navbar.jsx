import React from 'react';
import classNames from 'classnames';

const NavbarComponent = ({ clickNavLink, routing, links, user }) => {

  const LogoImg = require('../../../assets/images/teal_logo.png');

  return (
    <div className="container">
      <nav className="navbar">
        <div className="nav-left flex">
          <a className="logo" onClick={() => clickNavLink('/')}>
            <img src={LogoImg} />
          </a>
          <ul className="links nav">
          {
            links.map((link) => {
              const classes = classNames(
                {
                  'active': link.path === (routing.location
                    && routing.location.pathname)
                },
                'nav-item'
              );
              return (
                <li className={classes} key={link.title}>
                  <a className="nav-link link-accent small-caps" onClick={() => clickNavLink(link.path)}>
                    {link.title}
                  </a>
                </li>
              )
            })
          }
          </ul>
        </div>
        <div className="nav-right">
          <ul className="links nav">
            {
              user
                ?
                  <div className="nav-user flex row-center">
                    <a className="link-accent text-truncate flex-expand">{user.fullname}</a>
                    <div className="avatar img-cover img-circle"
                         style={{backgroundImage: `url(${user.avatarURL})`}}>
                    </div>
                  </div>
                :
                  <div className="nav-actions flex row-center">
                    <a className="link-accent m-r-md">Login</a>
                    <div className="btn btn-primary-outline btn-caps strong">Join Fruks</div>
                  </div>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
