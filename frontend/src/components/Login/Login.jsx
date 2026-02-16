import React from 'react';
import LoginHeader from './LoginHeader';
import LoginInputFields from './LoginInputFields';
import LoginTerms from './LoginTerms';
import LoginToggle from './LoginToggle';
import useLoginState from '../../hooks/loginAuthForm/useLoginState';
import useLoginForm from '../../hooks/loginAuthForm/useLoginForm';
import useAuth from '../../hooks/loginAuthForm/useAuth';
import Button from './LoginButton';

const Login = ({ setLogin }) => {
  const { currstate, toggleState } = useLoginState();
  const { formData, handleChange } = useLoginForm();
  const { isSubmitting, handleSubmit } = useAuth(setLogin);

  return (
    <div className='fixed top-0 left-0 w-full h-full grid z-1000 bg-black/50 animate-[fadeIn_0.5s]'>
      <form 
        className='place-self-center bg-white text-gray-600 flex flex-col gap-6 w-full max-w-[max(23vw,330px)] p-[25px_30px] rounded-lg text-sm' 
        onSubmit={(e) => handleSubmit(e, currstate, formData)}
      >
        <LoginHeader 
          currstate={currstate} 
          onClose={() => setLogin(false)} 
        />
        
        <LoginInputFields
          currstate={currstate}
          formData={formData}
          onChange={handleChange}
          isSubmitting={isSubmitting}
        />
        <LoginTerms />

        <Button isSubmitting={isSubmitting} currstate={currstate} />
        
        <LoginToggle 
          currstate={currstate} 
          onToggle={toggleState} 
        />
      </form>
    </div>
  );
};

export default Login;
