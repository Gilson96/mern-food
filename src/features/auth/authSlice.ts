import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@/hooks/dataTypes';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
    token: null,
    role: null,
    address: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, token, role, address } = action.payload;
      state.email = email;
      state.token = token;
      state.role = role;
      state.address = address || null;
    },

    logOut: (state) => {
      state.email = null;
      state.token = null;
      state.role = null;
      state.address = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
