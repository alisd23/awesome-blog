import React from 'react';
import classnames from 'classnames';
import config from '../../server/config';

const whiteLogo = require('../../../assets/images/white_logo.png');

const FooterComponent = ({ closeMenu }) => {

  return (
    <section id="footer" className="column center-a">
      <h5 className="site-link">
        <a className="link-white small-caps"
          href={config.fruks_web_hostname}>
          <p className="m-a-0">fruks.com</p>
          <img src={whiteLogo} />
        </a>
      </h5>
      <div className="copyright">
        <p className="m-b-sm">© Fruks Partnership Company 2016</p>
        <p className="m-b-0">All Rights Reserved</p>
      </div>
    </section>
  );
}

export default FooterComponent;
