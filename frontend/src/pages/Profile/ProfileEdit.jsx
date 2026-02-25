import React from 'react';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

const ProfileEdit = ({ user, isEditing, isChangingPassword, onUserUpdate, onCancelEdit, onCancelPassword }) => (
  <>
    {isEditing && !isChangingPassword && (
      <EditProfileForm 
        user={user}
        onUserUpdate={onUserUpdate}
        onCancel={onCancelEdit}
      />
    )}
    {isChangingPassword && (
      <ChangePasswordForm 
        onCancel={onCancelPassword}
      />
    )}
  </>
);

export default ProfileEdit;
