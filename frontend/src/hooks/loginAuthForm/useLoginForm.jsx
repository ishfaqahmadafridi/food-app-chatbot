import { useState } from 'react';

const useLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      password2: ""
    });
  };

  return {
    formData,
    handleChange,
    resetForm
  };
};

export default useLoginForm;
