import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'
import { routeActions, push } from 'react-router-redux';
import NavbarComponent from '../components/Navbar';

const links = [
  {
    title: 'Home',
    path: '/'
  }
]

@connect(mapStateToProps)
export default class NavbarContainer extends React.Component {
  static propTypes = {
    routing: React.PropTypes.object,
    user: React.PropTypes.object
  }

  render() {
    const { routing, user, dispatch } = this.props;
    return (
      <NavbarComponent
        clickNavLink={(route) => dispatch(push(route))}
        routing={routing}
        links={links}
        user={user}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing,
    user: state.auth.user
  }
}
