import React from 'react';
import classnames from 'classnames';

const HamburgerMenuComponent = ({ toggleMenu, mobileNavOpen }) => {
  const classes = classnames(
    "hamburger",
    { 'open': mobileNavOpen }
  );

  return (
    <div className={classes} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerMenuComponent;
