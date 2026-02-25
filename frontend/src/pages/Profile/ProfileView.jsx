import React from 'react';
import ProfileImageBlock from './ProfileImageBlock';
import ProfileInfoBlock from './ProfileInfoBlock';
import ProfileActionsBlock from './ProfileActionsBlock';

const ProfileView = ({ user, onEditProfile, onChangePassword, onLogout }) => (
  <>
    <ProfileImageBlock user={user} />
    <ProfileInfoBlock user={user} />
    <ProfileActionsBlock 
      onEditProfile={onEditProfile}
      onChangePassword={onChangePassword}
      onLogout={onLogout}
    />
  </>
);

export default ProfileView;
