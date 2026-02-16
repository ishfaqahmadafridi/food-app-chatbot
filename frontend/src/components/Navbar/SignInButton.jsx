import React from 'react';
import { Button } from '@/components/ui/button';

const SignInButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="blue"
      size='lg'
      className='rounded-[15px] w-full'
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
