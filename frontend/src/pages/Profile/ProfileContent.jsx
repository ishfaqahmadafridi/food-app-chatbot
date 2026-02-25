import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import LoadingState from './LoadingState';
import { fetchUserProfile } from  '../../redux/features/profile/profileDataThunk';
import { updateUser } from '../../redux/features/profile/profileDataSlice';
import { logout } from '../../redux/features/auth/authThunk/authSlice';
import useScrollLock from '../../hooks/profile/useScrollLock';

const ProfileContent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading } = useSelector((state) => state.profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  useScrollLock();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/');
      return;
    }
    
    dispatch(fetchUserProfile()).unwrap().catch(() => {
      navigate('/');
    });
  }, [dispatch, navigate]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Handle user update
  const handleUserUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    return <p className="text-center text-red-500 py-4">Unable to load profile information</p>;
  }

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
