import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import authApi from '../../services/auth';

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('userToken');
      toast.success('Logged out successfully');
      navigate('/');
    }
  };

  return handleLogout;
};

export default useLogout;
