import React from 'react';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';

const ProfileComponent = ({ user }) => {
  return (
    <div className='container'>
      <div className='change-password-form'>
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default ProfileComponent;
