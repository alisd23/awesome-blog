import * as React from 'react';
import classNames = require('classnames');
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import ILink from '../interfaces/Link';
import NavbarComponent from '../components/Navbar';

// Import styles

interface INavbarProps {
  push?: (String) => any;
  routing?: any;
}

const links: ILink[] = [
  {
    title: 'Home',
    path: '/'
  }
]

class NavbarContainer extends React.Component<INavbarProps, {}> {

  render() : React.ReactElement<{}> {

    return (
      <NavbarComponent
        clickNavLink={(route) => this.props.push(route)}
        routing={this.props.routing}
        links={links}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}

export default connect(
  mapStateToProps,
  routeActions as any
)(NavbarContainer)
