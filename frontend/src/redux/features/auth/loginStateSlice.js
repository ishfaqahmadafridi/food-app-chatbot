import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currstate: 'Login', 
};

const loginStateSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.currstate = state.currstate === 'Login' ? 'Sign Up' : 'Login';
    },
    setLoginState: (state, action) => {
      state.currstate = action.payload;
    },
    resetLoginState: (state) => {
      state.currstate = 'Login';
    },
  },
});

export const { toggleState, setLoginState, resetLoginState } = loginStateSlice.actions;
export default loginStateSlice.reducer;
