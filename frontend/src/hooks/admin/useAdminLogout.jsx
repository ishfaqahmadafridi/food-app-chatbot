import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useAdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return { handleLogout };
};

export default useAdminLogout;