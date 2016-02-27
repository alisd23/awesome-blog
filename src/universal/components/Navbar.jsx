import React from 'react';
import classNames from 'classnames';

// interface INavbarProps {
//   clickNavLink?: (string) => any;
//   routing?: any;
//   links: ILink[];
// }

export default class NavbarComponent extends React.Component {

  render() {
    return (
      <div className="flex-static bg-faded p-y-1">
        <div className="container">
          <nav className="navbar navbar-light container-fluid flex row-center">
            <a className="navbar-brand m-r-2 flex-static" onClick={() => this.props.clickNavLink('/')}>
              fruks
            </a>
            <ul className="nav navbar-nav flex-expand">
            {
              this.props.links.map((link) => {
                const classes = classNames(
                  {
                    'strong active': link.path === (this.props.routing.location
                      && this.props.routing.location.pathname)
                  },
                  'nav-item'
                );
                return (
                  <li className={classes} key={link.title}>
                    <a className="nav-link small-caps" onClick={() => this.props.clickNavLink(link.path)}>
                      {link.title}
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
