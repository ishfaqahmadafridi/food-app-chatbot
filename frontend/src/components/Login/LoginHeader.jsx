import React from 'react';
import { useSelector } from 'react-redux';
import { assets } from '../../assets/frontend_assets/assets';

const LoginHeader = ({ onClose }) => {
  const { currstate } = useSelector((state) => state.loginState);

  return (
    <div className="flex items-center justify-between text-black">
      <h2 className="text-xl font-semibold">{currstate}</h2>
      <img className='w-4 cursor-pointer hover:opacity-70 transition-opacity'  src={assets.cross_icon} onClick={onClose} alt="Close" />
    </div>
  );
};

export default LoginHeader;
