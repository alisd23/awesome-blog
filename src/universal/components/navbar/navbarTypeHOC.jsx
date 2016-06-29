import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeNavbarType } from '../../redux/ducks/global';

// Navbar type decorater used by containers to set what the navbar looks
// like for that specific page
export default (navbarType) => {
  const mapDispatchToProps = { changeNavbarType };

  return (Component) => {
    @connect(null, mapDispatchToProps)
    class NavbarHOC extends Component {
      componentWillMount() {
        const { changeNavbarType } = this.props;
        changeNavbarType(navbarType);
      }
      render() {
        return <Component {...this.props} />;
      }
    }

    return NavbarHOC;
  };
};
