import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useAdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return { handleLogout };
};

export default useAdminLogout;
