import React from 'react';
import EditProfileForm from '../../../components/profile/profileChangeEdit/EditProfileForm';
import ChangePasswordForm from '../../../components/profile/profileChangeEdit/ChangePasswordForm';

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
