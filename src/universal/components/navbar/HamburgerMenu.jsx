import React from 'react';
import classnames from 'classnames';

const HamburgerMenuComponent = ({ toggleMenu, mobileNavOpen }) => {
  const classes = classnames(
    'hamburger hamburger--slider',
    { 'is-active': mobileNavOpen }
  );

  return (
    <div className={classes} onClick={toggleMenu}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </div>
  );
}

export default HamburgerMenuComponent;
