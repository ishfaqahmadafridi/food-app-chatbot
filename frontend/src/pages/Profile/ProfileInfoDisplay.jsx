import React from 'react';
import { Badge } from '@/components/ui/badge';

const ProfileInfoDisplay = ({ user }) => {
  return (
    <>
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-600 font-medium text-sm">Username</span>
        <span className="text-gray-800 font-normal">{user.username}</span>
      </div>

      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-600 font-medium text-sm">Email</span>
        <span className="text-gray-800 font-normal">{user.email || 'Not provided'}</span>
      </div>

      {user.first_name && (
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600 font-medium text-sm">First Name</span>
          <span className="text-gray-800 font-normal">{user.first_name}</span>
        </div>
      )}

      {user.last_name && (
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600 font-medium text-sm">Last Name</span>
          <span className="text-gray-800 font-normal">{user.last_name}</span>
        </div>
      )}

      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-600 font-medium text-sm">Account Type</span>
        <span className="text-gray-800 font-normal">
          {user.is_staff ? (
            <Badge variant="default" >👨‍💼 Admin</Badge>
          ) : (
            <Badge variant="secondary">👤 Regular User</Badge>
          )}
        </span>
      </div>
    </>
  );
};

export default ProfileInfoDisplay;
