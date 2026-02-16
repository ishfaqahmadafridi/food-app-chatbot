import React from 'react';
import ProfileImageSection from './ProfileImageSection';
import ProfileInfoDisplay from './ProfileInfoDisplay';
import ProfileActions from './ProfileActions';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

const ProfileContent = ({ 
  user, 
  isEditing, 
  isChangingPassword, 
  onUserUpdate,
  onEditProfile,
  onChangePassword,
  onCancelEdit,
  onCancelPasswordChange,
  onLogout
}) => {
  if (!user) {
    return <p className="text-center text-red-500 py-4">Unable to load profile information</p>;
  }

  return (
    <div className="profile-content">
      {/* Display Profile Information */}
      {!isEditing && !isChangingPassword && (
        <>
          <ProfileImageSection user={user} onUserUpdate={onUserUpdate} />
          <ProfileInfoDisplay user={user} />
          <ProfileActions 
            onEditProfile={onEditProfile}
            onChangePassword={onChangePassword}
            onLogout={onLogout}
          />
        </>
      )}

      {/* Edit Profile Form */}
      {isEditing && !isChangingPassword && (
        <EditProfileForm 
          user={user}
          onUserUpdate={onUserUpdate}
          onCancel={onCancelEdit}
        />
      )}

      {/* Change Password Form */}
      {isChangingPassword && (
        <ChangePasswordForm 
          onCancel={onCancelPasswordChange}
        />
      )}
    </div>
  );
};

export default ProfileContent;
