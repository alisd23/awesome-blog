import React from 'react';
import ProfileForm from '../../../components/forms/ProfileForm';

const ProfileComponent = ({ user }) => {
  return (
    <div className='container'>
      <div className='profile-form'>
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileComponent;
