import React from 'react';
import { connect } from 'react-redux'
import ProfileComponent from './Profile';
import AuthenticatedComponent from '../../../higher-order-components/AuthenticatedHOC';
import config from '../../../head.config';
import Helmet from 'react-helmet';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

@AuthenticatedComponent
@connect(mapStateToProps)
export default class ProfileContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Helmet {...config} title='Awesome Blog - Profile'/>
        <ProfileComponent user={user} />
      </div>
    )
  }
}
