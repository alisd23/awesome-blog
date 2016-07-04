import React from 'react';
import { connect } from 'react-redux'
import Profile from './Profile';
import config from '../../../head.config';
import Helmet from 'react-helmet';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

@connect(mapStateToProps)
export default class ProfileContainer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <div id='profile-page'>
        <Helmet {...config} title='Awesome Blog - Profile'/>
        <Profile user={user} />
      </div>
    )
  }
}
