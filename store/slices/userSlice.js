// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET /users/get-all-users
export const fetchAllUsers = createAsyncThunk(
   'user/fetchAll',
   async (params = {}, { getState, rejectWithValue }) => {
      try {
         const { page = 1, limit = 20, q = '', role = '' } = params;
         const { token } = getState().auth;
         const qs = new URLSearchParams({ page, limit, q, role });
         const res = await axios.get(`/users/get-all-users?${qs.toString()}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         return res.data.data; // { users, pagination }
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message);
      }
   }
);

// GET /users/get-user-by-id?id=...
export const fetchUserById = createAsyncThunk(
   'user/fetchById',
   async (userId, { getState, rejectWithValue }) => {
      try {
         const { token } = getState().auth;
         const res = await axios.get(`/users/get-user-by-id?id=${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         return res.data.data.user;
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message);
      }
   }
);

// PATCH /users/update-user?id=...
export const updateUser = createAsyncThunk(
   'user/update',
   async ({ userId, userData }, { getState, rejectWithValue }) => {
      try {
         const { token } = getState().auth;
         const res = await axios.patch(
            `/users/update-user?id=${userId}`,
            userData,
            { headers: { Authorization: `Bearer ${token}` } }
         );
         return res.data.data.user;
      } catch (err) {
         return rejectWithValue(err.response?.data || err.message);
      }
   }
);

const userSlice = createSlice({
   name: 'user',
   initialState: {
      list: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 0 },
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
         // fetchAllUsers
         .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.users || [];
            state.pagination = action.payload.pagination || state.pagination;
         })
         .addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // fetchUserById
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

         // updateUser
         .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProfile = action.payload;

            // also update the item in list if present
            const idx = state.list.findIndex(u => String(u._id) === String(action.payload?._id));
            if (idx !== -1) state.list[idx] = action.payload;
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { clearUserProfile, clearError } = userSlice.actions;
export default userSlice.reducer;
