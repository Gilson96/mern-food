import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AuthState, User } from '@/hooks/dataTypes';

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, token: null, role: null } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      const { email, token, role } = action.payload;
      state.email = email;
      state.token = token;
      state.role = role;
    },

    logOut: (state) => {
      state.email = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentToken = (state: RootState) => state.auth.token;
