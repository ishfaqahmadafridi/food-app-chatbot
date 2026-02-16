import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
      <h2 className="m-0 text-2xl text-gray-800 font-semibold">My Profile</h2>
      <button 
        className="bg-transparent border-none cursor-pointer flex items-center justify-center p-1 text-gray-500 hover:text-gray-800 transition-colors"
        onClick={() => navigate('/')}
        title="Close"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default ProfileHeader;
