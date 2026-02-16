import { useState } from 'react';

const useLoginState = () => {
  const [currstate, setcurrstate] = useState("Login");

  const toggleState = () => {
    setcurrstate(prev => prev === "Login" ? "Sign Up" : "Login");
  };

  return {
    currstate,
    toggleState
  };
};

export default useLoginState;
