import React, { useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '../../services/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';   

const ChangePasswordForm = ({ onCancel }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  // Input handler for password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Update user password with PasswordUpdateData (currentPassword, newPassword)
  const handlePasswordUpdate = async () => {
    try {
      // Validate that both password fields are not empty
      if (!passwordData.currentPassword || !passwordData.newPassword) {
        toast.error('Please enter both passwords');
        return;
      }
      
      // Call userApi.updatePassword with password change data
      const response = await userApi.updatePassword(passwordData);
      
      toast.success(response.message || 'Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '' });
      onCancel();
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="edit-form">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-100">Change Password</h3>
      <div className="mb-4">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          placeholder="Enter current password"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button 
          variant= "yellow"
          size = 'lg'
          onClick={handlePasswordUpdate}
        >
          🔐 Update Password
        </Button>
        <Button 
          variant = "gray"
          size = 'lg'
          onClick={onCancel}
        >
          ❌ Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
