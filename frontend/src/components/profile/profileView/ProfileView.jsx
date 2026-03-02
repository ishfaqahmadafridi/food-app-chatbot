import React from 'react';
import ProfileImageBlock from '../profileImageSection/ProfileImageBlock';
import ProfileInfoBlock from '../profileinfo/ProfileInfoBlock';
import ProfileActionsBlock from '../profileAction/ProfileActionsBlock';

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
