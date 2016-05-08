import React from 'react';
import classnames from 'classnames';
import localConfig from '../../server/local.config';

const whiteLogo = require('../../../assets/images/white_logo.png');

const FooterComponent = ({ closeMenu }) => {

  return (
    <section id="footer" className="column center-a">
      <h5 className="site-link">
        <div className="link-white small-caps">
          <p className="m-a-0">Awesome Blog Site</p>
          <img src={whiteLogo} />
        </div>
      </h5>
      <div className="copyright">
        <p className="m-b-sm">© Awesome Blog Company 2016</p>
        <p className="m-b-0">All Rights Reserved</p>
      </div>
    </section>
  );
}

export default FooterComponent;
