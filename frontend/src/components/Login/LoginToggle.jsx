import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../redux/features/auth/loginStateSlice'; 
const LoginToggle = () => {
  const { currstate } = useSelector((state) => state.loginState);
  const dispatch = useDispatch();

    const handleToggle = () => {
      dispatch(toggleState());
    };

  return (
    <>
      {currstate === 'Login' ? (
        <p className='text-sm'>Create a new account ? <span className='text-[#ff6347] font-medium cursor-pointer hover:underline' onClick={handleToggle}>click here</span></p>
      ) : (
        <p className='text-sm'>Already have an account ? <span className='text-[#ff6347] font-medium cursor-pointer hover:underline' onClick={handleToggle}>Login here</span></p>
      )}
    </>
  );
};

export default LoginToggle;
