import React, { useState } from 'react';
import toast from 'react-hot-toast';
import userApi from '../../services/user';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditProfileForm = ({ user, onUserUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.username || '',
    email: user.email || ''
  });

  // Input handler for profile form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Update user profile with ProfileUpdateData (name, email)
  const handleProfileUpdate = async () => {
    try {
      // Validate that name and email are not empty
      if (!formData.name || !formData.email) {
        toast.error('Please fill in all fields');
        return;
      }
      
      // Call userApi.updateProfile with form data
      const response = await userApi.updateProfile(formData);
      
      if (response.user) {
        onUserUpdate(response.user);
      }
      toast.success(response.message || 'Profile updated successfully');
      onCancel();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="edit-form">
      <h3 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-100">Edit Profile</h3>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="flex gap-2 mt-5">
        <Button 
          variant = "blue"
          size = 'lg'
          onClick={handleProfileUpdate}
        >
          💾 Save Changes
        </Button>
        <Button 
          variant= "gray"
          size = 'lg'
          onClick={onCancel}
        >
          ❌ Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
