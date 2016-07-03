import React from 'react';
import ProfileForm from '../../../components/forms/profileForm';

const ProfileComponent = ({ user }) => {
  return (
    <div className='container' id='profile-page'>
      <div className='profile-form'>
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileComponent;
