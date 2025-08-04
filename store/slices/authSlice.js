// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  isLoading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setRole, setLoading } = authSlice.actions;
export default authSlice.reducer;