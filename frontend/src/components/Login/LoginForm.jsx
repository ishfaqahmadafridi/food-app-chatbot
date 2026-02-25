import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoginHeader from './LoginHeader';
import LoginInputFields from './LoginInputFields';
import LoginTerms from './LoginTerms';
import LoginToggle from './LoginToggle';
import Button from './LoginButton';
import { loginUser, signupUser } from '../../redux/features/auth/authThunk/authThunk';

const LoginForm = ({ setLogin }) => {
    const dispatch = useDispatch();
    const { currstate } = useSelector((state) => state.loginState);
    const { formData } = useSelector((state) => state.loginForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = currstate === "Sign Up" ? signupUser : loginUser;
        dispatch(action({ formData, setLogin }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            method="POST"
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

