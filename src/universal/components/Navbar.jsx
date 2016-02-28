import React from 'react';
import classNames from 'classnames';


export default class NavbarComponent extends React.Component {
  static propTypes = {
    clickNavLink: React.PropTypes.func,
    routing: React.PropTypes.object,
    links: React.PropTypes.array
  }

  componentDidMount() {
    document.addEventListener('scroll', (e) => console.log("SCROLLED"))
  }

  render() {
    const LogoImg = require('../../../assets/images/teal_logo.png');

    return (
      <div className="container">
        <nav className="navbar">
          <div className="nav-left flex">
            <a className="logo" onClick={() => this.props.clickNavLink('/')}>
              <img src={LogoImg} />
            </a>
            <ul className="links nav">
            {
              this.props.links.map((link) => {
                const classes = classNames(
                  {
                    'active': link.path === (this.props.routing.location
                      && this.props.routing.location.pathname)
                  },
                  'nav-item'
                );
                return (
                  <li className={classes} key={link.title}>
                    <a className="nav-link link-accent small-caps" onClick={() => this.props.clickNavLink(link.path)}>
                      {link.title}
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </div>
          <div className="nav-right">
            <div className="btn btn-primary-outline btn-caps strong">Join Fruks</div>
          </div>
        </nav>
      </div>
    )
  }
}
