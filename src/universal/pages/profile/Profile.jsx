import React from 'react';
import ProfileForm from '../../components/forms/profileForm';

const ProfileComponent = ({ user }) => {
  return (
    <div className='container' id='profile-page'>
      <h1 className='m-b-lg text-xs-center'>Profile</h1>
      <div className='profile-form'>
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileComponent;
