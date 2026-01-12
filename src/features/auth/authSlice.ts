import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@/hooks/dataTypes';

const authSlice = createSlice({
  name: 'auth',
  initialState: { role: "guest", user_id: null } as AuthState,

  reducers: {

    setLogin: (state, action) => {
      const { role, user_id } = action.payload;
      state.role = role;
      state.user_id = user_id;
    },

    logOut: (state) => {
      state.role = null;
    },
  },
});

export const { setLogin, logOut } = authSlice.actions;

export default authSlice.reducer;
