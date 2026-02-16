import React from 'react';

const LoginToggle = ({ currstate, onToggle }) => {
  return (
    <>
      {currstate === 'Login' ? (
        <p className='text-sm'>Create a new account ? <span className='text-[#ff6347] font-medium cursor-pointer hover:underline' onClick={onToggle}>click here</span></p>
      ) : (
        <p className='text-sm'>Already have an account ? <span className='text-[#ff6347] font-medium cursor-pointer hover:underline' onClick={onToggle}>Login here</span></p>
      )}
    </>
  );
};

export default LoginToggle;
