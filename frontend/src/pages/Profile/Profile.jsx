import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import LoadingState from './LoadingState';
import useProfileData from '../../hooks/profile/useProfileData';
import useScrollLock from '../../hooks/profile/useScrollLock';
import useLogout from '../../hooks/profile/useLogout';

const Profile = () => {
  const { user, loading, setUser } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const handleLogout = useLogout();
  
  useScrollLock();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="fixed w-full h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center z-1000 overflow-y-auto top-0 left-0">
      <div className="max-w-550px w-[90%] max-h-[90vh]  overflow-y-auto
       relativeanimate-[fadeIn_0.3s] my-5 
      mx-auto scrollbar-thin scrollbar-thumb-[#667eea]/50 scrollbar-track-transparent 
      hover:scrollbar-thumb-[#667eea]/70 ">
        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] mx-auto max-w-lg w-full   p-[30px_35px] min-h-fit animate-[slideUp_0.3s_ease-out]">
          <ProfileHeader />
          <ProfileContent 
            user={user}
            isEditing={isEditing}
            isChangingPassword={isChangingPassword}
            onUserUpdate={setUser}
            onEditProfile={() => setIsEditing(true)}
            onChangePassword={() => setIsChangingPassword(true)}
            onCancelEdit={() => setIsEditing(false)}
            onCancelPasswordChange={() => setIsChangingPassword(false)}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
