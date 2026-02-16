import { useState, useEffect } from 'react';
import userApi from '../../services/user';

const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        try {
          const user = await userApi.getCurrentProfile();
          setIsAdmin(user.is_staff || false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setIsAdmin(false);
        }
      }
    };

    fetchAdminStatus();
  }, []);

  return isAdmin;
};

export default useAdminStatus;
