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

class NavbarContainer extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
    routing: React.PropTypes.object
  }

  render() {
    return (
      <NavbarComponent
        clickNavLink={(route) => this.props.dispatch(push(route))}
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
  null
)(NavbarContainer)
