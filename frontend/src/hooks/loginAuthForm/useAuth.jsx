import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const useAuth = (setLogin) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (formData) => {
    const response = await api.post('/login/', {
      username: formData.username,
      password: formData.password
    });

    localStorage.setItem('userToken', response.data.access);
    toast.success('Logged in successfully');
    setLogin(false);
    window.location.reload();
  };

  const handleSignup = async (formData) => {
    if (formData.password !== formData.password2) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await api.post('/signup/', {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password2: formData.password2
    });

    localStorage.setItem('userToken', response.data.access);
    toast.success('Account created successfully');
    setLogin(false);
    window.location.reload();
  };

  const handleSubmit = async (e, currstate, formData) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (currstate === "Login") {
        await handleLogin(formData);
      } else {
        await handleSignup(formData);
      }
    } catch (error) {
      let message = 'An error occurred. Please try again.';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.error) {
          message = errorData.error;
        } else if (typeof errorData === 'object') {
          const errors = Object.entries(errorData)
            .map(([field, messages]) => {
              const errorMsg = Array.isArray(messages) ? messages[0] : messages;
              return `${field}: ${errorMsg}`;
            })
            .join(', ');
          message = errors || message;
        }
      }
      
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};

export default useAuth;
