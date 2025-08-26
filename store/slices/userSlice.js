// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching user by ID
export const fetchUserById = createAsyncThunk(
   'user/fetchById',
   async (userId, { getState, rejectWithValue }) => {
      try {
         const { token } = getState().auth;
         const response = await axios.get(`/api/users/get-user-by-id?id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         return response.data.data.user;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   }
);

// Async thunk for updating user
export const updateUser = createAsyncThunk(
   'user/update',
   async ({ userId, userData }, { getState, rejectWithValue }) => {
      try {
         const { token } = getState().auth;
         const response = await axios.patch(
            `/api/users/update-user?id=${userId}`,
            userData,
            { headers: { Authorization: `Bearer ${token}` } }
         );
         return response.data.data.user;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   }
);

const userSlice = createSlice({
   name: 'user',
   initialState: {
      currentProfile: null,
      loading: false,
      error: null,
   },
   reducers: {
      clearUserProfile: (state) => {
         state.currentProfile = null;
      },
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch user by ID
         .addCase(fetchUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProfile = action.payload;
         })
         .addCase(fetchUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Update user
         .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProfile = action.payload;
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { clearUserProfile, clearError } = userSlice.actions;
export default userSlice.reducer;