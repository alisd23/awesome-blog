import React from 'react';
import classnames from 'classnames';

const MobileMenuComponent = ({ closeMenu }) => {

  return (
    <div className="mobile-menu">
      <div className="backdrop" onClick={closeMenu}></div>
      <div className="menu"></div>
    </div>
  );
}

export default MobileMenuComponent;
