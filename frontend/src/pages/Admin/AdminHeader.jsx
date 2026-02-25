import React from 'react';
import { LogOut, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/features/admin/adminLogout/adminLogoutSlice';


const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(logoutSuccess());
      navigate('/');
    };


  return (
    <div className="flex flex-col md:flex-row justify-between items-center max-w-1200px mx-auto mb-8 text-white p-5 gap-4 md:gap-0">
      <h1 className="text-2xl md:text-[32px] m-0 font-bold">🍔 Admin Panel</h1>
      <div className="flex gap-3">
        <button 
          className="bg-[#667eea] text-white border-0 py-2.5 px-5 rounded-[25px] cursor-pointer flex items-center gap-2.5 font-medium transition-colors hover:bg-[#5567d8]"
          onClick={() => navigate('/admin/contacts')}
        >
          <MessageSquare size={20} /> Contact Messages
        </button>
        <button 
          className="bg-red-500 text-white border-0 py-2.5 px-5 rounded-[25px] cursor-pointer flex items-center gap-2.5 font-medium transition-colors hover:bg-[#c0392b]"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
