

import api from './api';   


export interface User {
  id?: number;
  name: string;
  username?: string;
  password?: string;      
  email: string;
  is_staff?: boolean;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  profile?: {
    profile_image?: string;
    bio?: string;
    phone?: string;
  };
}


export interface ProfileUpdateData {
  name?: string;
  email?: string;
  
}


export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;     
}


export interface UpdateResponse {
  message?: string;
  user?: User;            
}


const userApi = {


  async updateProfile(data: ProfileUpdateData): Promise<User | UpdateResponse> {
    const response = await api.put<User | UpdateResponse>('/profile/', data);
    return response.data;
  },


  async updatePassword(data: PasswordUpdateData): Promise<UpdateResponse> {
    const response = await api.put<UpdateResponse>('/profile/', data);
    return response.data;
  },


  async getCurrentProfile(): Promise<User> {
    const response = await api.get<User>('/profile/'); 
    return response.data;
  },


  async uploadProfileImage(imageFile: File): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append('profile_image', imageFile);
    const response = await api.put<UpdateResponse>('/profile/', formData);
    return response.data;
  },

  // Delete user profile image
  // Sends delete request with empty profile_image
  // Returns: Updated user object with profile_image removed
  async deleteProfileImage(): Promise<UpdateResponse> {
    const formData = new FormData();
    formData.append('profile_image', '');
    const response = await api.put<UpdateResponse>('/profile/', formData);
    return response.data;
  },

};

export default userApi;