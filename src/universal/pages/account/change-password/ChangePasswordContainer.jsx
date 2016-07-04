import React, { Component } from 'react';
import { connect } from 'react-redux'
import ChangePassword from './ChangePassword';
import config from '../../../head.config';
import Helmet from 'react-helmet';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

@connect(mapStateToProps)
export default class ProfileContainer extends Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props;

    return (
      <div id='change-password-page'>
        <Helmet {...config} title='Awesome Blog - Change Password' />
        <ChangePassword user={user} />
      </div>
    )
  }
}
