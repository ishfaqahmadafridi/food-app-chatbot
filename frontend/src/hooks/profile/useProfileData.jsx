import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import userApi from '../../services/user';

const useProfileData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via JWT token
    const token = localStorage.getItem('userToken');
    if (!token) {
      toast.error('Please log in first');
      navigate('/');
      return;
    }

    // Fetch user profile from API using userApi service
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await userApi.getCurrentProfile();
        setUser(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return { user, loading, setUser };
};

export default useProfileData;
