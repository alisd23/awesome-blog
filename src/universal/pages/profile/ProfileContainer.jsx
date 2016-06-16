import React from 'react';
import { connect } from 'react-redux'
import ProfileComponent from './Profile';
import AuthenticatedComponent from '../../higher-order-components/AuthenticatedHOC';
import { mixin } from 'core-decorators';
import { NavbarSolid } from '../../mixins/navbar';
import config from '../../head.config';
import Helmet from 'react-helmet';

@AuthenticatedComponent
@connect(mapStateToProps)
@mixin(NavbarSolid)
export default class HomeContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Helmet {...config} title="Awesome Blog - Profile"/>
        <ProfileComponent user={user} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}
