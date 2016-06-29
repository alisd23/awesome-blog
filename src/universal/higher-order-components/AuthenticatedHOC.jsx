import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

export default (Component) => {
  const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user
  });
  const mapDispatchToProps = { replace };

  @connect(mapStateToProps, mapDispatchToProps)
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.replace(`/`);
      }
    }

    render() {
      return this.props.isAuthenticated
        ? <Component {...this.props}/>
        : null;
    }
  }

  return AuthenticatedComponent;
}
