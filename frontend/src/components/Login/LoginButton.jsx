import React from 'react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux';



const LoginButton = () => {

    const { currstate } = useSelector((state) => state.loginState);
    const { isSubmitting } = useSelector((state) => state.auth);



    return (
        <div>
            <Button
                type='submit'
                variant='Tomato'
                size='lg'
                className='rounded-[15px] w-full'
                disabled={isSubmitting}
            >
                {currstate === "Sign Up" ? "Create Account" : "Login"}
            </Button>
        </div>
    )
}

export default LoginButton
