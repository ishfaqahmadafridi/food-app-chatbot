import React from 'react';
import { LogOut } from 'lucide-react';

const ProfileActions = ({ onEditProfile, onChangePassword, onLogout }) => {
  return (
    <div className="flex gap-2 mt-6 pt-6 border-t-2 border-gray-100">
      <button 
        className="flex-1 py-2.5 px-4 rounded-lg border-2 border-[#667eea] text-[#667eea] font-medium text-sm cursor-pointer transition-all hover:bg-[#667eea] hover:text-white"
        onClick={onEditProfile}
      >
        ✏️ Edit Profile
      </button>
      <button 
        className="flex-1 py-2.5 px-4 rounded-lg border-2 border-[#f39c12] text-[#f39c12] font-medium text-sm cursor-pointer transition-all hover:bg-[#f39c12] hover:text-white"
        onClick={onChangePassword}
      >
        🔐 Change Password
      </button>
      <button 
        className="flex-1 py-2.5 px-4 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white font-medium text-sm cursor-pointer border-none flex items-center justify-center gap-2 transition-all hover:from-red-600 hover:to-red-700"
        onClick={onLogout}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default ProfileActions;
