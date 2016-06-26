import React from 'react';
import ProfileForm from '../../components/forms/profileForm';

const ProfileComponent = ({ user }) => {
  return (
    <div className='container' id='profile-page'>
      <h1>Profile Page</h1>
      <ProfileForm />
    </div>
  );
}
export default ProfileComponent;
