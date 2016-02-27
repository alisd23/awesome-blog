import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux';
import NavbarComponent from '../components/Navbar';

// interface INavbarProps {
//   push?: (String) => any;
//   routing?: any;
// }

const links = [
  {
    title: 'Home',
    path: '/'
  }
]

class NavbarContainer extends React.Component {

  render() {

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
  routeActions
)(NavbarContainer)
