import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

export default (Component) => {

  @connect(mapStateToProps)
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.dispatch(replace(`/`));
      }
    }

    render() {
      return this.props.isAuthenticated
        ? <Component {...this.props}/>
        : null;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.auth.user
    };
  }

  return AuthenticatedComponent;
}
