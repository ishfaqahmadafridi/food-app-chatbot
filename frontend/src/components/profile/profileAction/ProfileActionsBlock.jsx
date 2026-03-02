import React from 'react';
import ProfileActions from './ProfileActions';

const ProfileActionsBlock = ({ onEditProfile, onChangePassword, onLogout }) => (
  <ProfileActions 
    onEditProfile={onEditProfile}
    onChangePassword={onChangePassword}
    onLogout={onLogout}
  />
);

export default ProfileActionsBlock;
