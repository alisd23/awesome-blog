import React from 'react';
import { withRouter } from 'react-router';
import AuthenticatedComponent from '../../../higher-order-components/AuthenticatedHOC';

@AuthenticatedComponent
export default class ChangePasswordContainer extends React.Component {
  render() {
    return (
      <section id='change-password-page'>
        <h3 className='m-b-lg text-xs-center'>Change Password</h3>
      </section>
    )
  }
}
