import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { updateField } from '../../redux/features/auth/loginFormSlice';

const LoginInputFields = () => {
  const dispatch = useDispatch();
  const { currstate } = useSelector((state) => state.loginState);
  const { formData } = useSelector((state) => state.loginForm);

    const handleChange = (e) => {
      const { name, value } = e.target;
      dispatch(updateField({ name, value }));
    };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        name="username"
        placeholder='username'
        value={formData.username}
        onChange={handleChange}
        autoComplete="username"
        required
      />
      {currstate === "Sign Up" && (
        <Input
          type="email"
          name="email"
          placeholder='email'
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      )}
      <Input
        type="password"
        name="password"
        placeholder='password'
        value={formData.password}
        onChange={handleChange}
        autoComplete={currstate === "Login" ? "current-password" : "new-password"}
        required
      />
      {currstate === "Sign Up" && (
        <Input
          type="password"
          name="password2"
          placeholder='confirm password'
          value={formData.password2}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
      )}

    </div>
  );
};

export default LoginInputFields;
