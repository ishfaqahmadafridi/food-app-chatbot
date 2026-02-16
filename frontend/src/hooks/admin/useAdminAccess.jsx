import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../services/user';
import toast from 'react-hot-toast';

const useAdminAccess = (onAccessGranted) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const token = localStorage.getItem('userToken');
      
      if (!token) {
        toast.error('Access denied. Please login first.');
        navigate('/');
        return;
      }

      try {
        const user = await userApi.getCurrentProfile();
        if (!user.is_staff) {
          toast.error('Access denied. Admin privileges required.');
          navigate('/');
          return;
        }
        if (onAccessGranted) {
          onAccessGranted();
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      }
    };

    checkAdminAccess();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
};

export default useAdminAccess;
