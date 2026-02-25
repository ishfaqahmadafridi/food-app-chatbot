import React from 'react';
import LoginForm from './loginForm';


const Login = ({ setLoginOpen }) => {

  return (
    <div className='fixed top-0 left-0 w-full h-full grid z-1000 bg-black/50 animate-[fadeIn_0.5s]'>
      {console.log('Login component rendered', { setLoginOpen })}
     <LoginForm setLogin={setLoginOpen} />
    </div>
  );
};

export default Login;
