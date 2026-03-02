import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileView from '../../../components/profile/profileView/ProfileView';
import ProfileEdit from '../../../components/profile/profileChangeEdit/ProfileEdit';
import { updateUser } from '../../../redux/features/profile/profileData/profileDataSlice';
import { logout } from '../../../redux/features/auth/authThunk/authSlice';

const ProfileContent = () => {
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { user } = useSelector((state) => state.profileData);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Handle user update
  const handleUserUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className="profile-content">
      {!isEditing && !isChangingPassword && (
        <ProfileView
          user={user}
          onEditProfile={() => setIsEditing(true)}
          onChangePassword={() => setIsChangingPassword(true)}
          onLogout={handleLogout}
        />
      )}
      {(isEditing || isChangingPassword) && (
        <ProfileEdit
          user={user}
          isEditing={isEditing}
          isChangingPassword={isChangingPassword}
          onUserUpdate={handleUserUpdate}
          onCancelEdit={() => setIsEditing(false)}
          onCancelPassword={() => setIsChangingPassword(false)}
        />
      )}
    </div>
  );
};

export default ProfileContent;