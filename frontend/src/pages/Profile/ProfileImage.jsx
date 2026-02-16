import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileImage = ({ imageUrl }) => {
  return (
    <div className="relative mb-4">
      <Avatar className="w-32 h-32 border-4 border-gray-200 shadow-md">
        <AvatarImage src={imageUrl} alt="Profile" />
        <AvatarFallback className="bg-linear-to-r from-purple-400 to-pink-400 text-white text-4xl">👤</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileImage;
