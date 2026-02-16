import React from 'react';
import { Input } from '@/components/ui/input';

const LoginInputFields = ({ currstate, formData, onChange,  }) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        name="username"
        placeholder='username'
        value={formData.username}
        onChange={onChange}
        autoComplete="username"
        required
      />
      {currstate === "Sign Up" && (
        <Input
          type="email"
          name="email"
          placeholder='email'
          value={formData.email}
          onChange={onChange}
          autoComplete="email"
          required
        />
      )}
      <Input
        type="password"
        name="password"
        placeholder='password'
        value={formData.password}
        onChange={onChange}
        autoComplete={currstate === "Login" ? "current-password" : "new-password"}
        required
      />
      {currstate === "Sign Up" && (
        <Input
          type="password"
          name="password2"
          placeholder='confirm password'
          value={formData.password2}
          onChange={onChange}
          autoComplete="new-password"
          required
        />
      )}

    </div>
  );
};

export default LoginInputFields;
