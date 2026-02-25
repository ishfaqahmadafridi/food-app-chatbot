import React from 'react'
import LoginHeader from './LoginHeader';
import LoginInputFields from './LoginInputFields';
import LoginTerms from './LoginTerms';
import LoginToggle from './LoginToggle';
import Button from './LoginButton';

const LoginForm = ({ setLogin }) => {
    return (
        <form
            className='place-self-center bg-white text-gray-600 flex flex-col gap-6 w-full max-w-[max(23vw,330px)] p-[25px_30px] rounded-lg text-sm'
        >
            <LoginHeader onClose={() => setLogin(false)} />

            <LoginInputFields
            />
            <LoginTerms />

            <Button />

            <LoginToggle />
        </form>
    )
}

export default LoginForm;
