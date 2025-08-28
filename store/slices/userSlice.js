// store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '@/services/userApi';

// Async thunks using the new service pattern
export const fetchAllUsers = createAsyncThunk(
   'users/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await userApi.getUsers(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUserById = createAsyncThunk(
   'users/fetchById',
   async (userId, { rejectWithValue }) => {
      try {
         return await userApi.getUserById(userId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateUser = createAsyncThunk(
   'users/update',
   async ({ userId, userData }, { rejectWithValue }) => {
      try {
         return await userApi.updateUser(userId, userData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteUser = createAsyncThunk(
   'users/delete',
   async (userId, { rejectWithValue }) => {
      try {
         return await userApi.deleteUser(userId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUsersByRole = createAsyncThunk(
   'users/fetchByRole',
   async (role, { rejectWithValue }) => {
      try {
         return await userApi.getUsersByRole(role);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const searchUsers = createAsyncThunk(
   'users/search',
   async (query, { rejectWithValue }) => {
      try {
         return await userApi.searchUsers(query);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   users: [], // Changed from 'list' to 'users' for consistency
   currentUser: null, // Changed from 'currentProfile' to 'currentUser'
   usersByRole: [],
   searchResults: [],
   pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
   },
   loading: false,
   error: null,
   filters: {
      q: '',
      role: ''
   }
};

const userSlice = createSlice({
   name: 'users', // Changed from 'user' to 'users' for consistency
   initialState,
   reducers: {
      clearCurrentUser: (state) => {
         state.currentUser = null;
      },
      clearError: (state) => {
         state.error = null;
      },
      clearSearchResults: (state) => {
         state.searchResults = [];
      },
      clearUsersByRole: (state) => {
         state.usersByRole = [];
      },
      setFilters: (state, action) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      resetFilters: (state) => {
         state.filters = { q: '', role: '' };
      },
      // Update user in list without refetching
      updateUserInList: (state, action) => {
         const updatedUser = action.payload;
         const index = state.users.findIndex(user => user._id === updatedUser._id);
         if (index !== -1) {
            state.users[index] = updatedUser;
         }
      }
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
            state.users = action.payload.users || [];
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
            state.currentUser = action.payload;
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
            state.currentUser = action.payload;

            // Update the user in the main list
            const index = state.users.findIndex(user => String(user._id) === String(action.payload._id));
            if (index !== -1) {
               state.users[index] = action.payload;
            }
         })
         .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // deleteUser
         .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(user => user._id !== action.meta.arg);
            if (state.currentUser && state.currentUser._id === action.meta.arg) {
               state.currentUser = null;
            }
         })

         // fetchUsersByRole
         .addCase(fetchUsersByRole.fulfilled, (state, action) => {
            state.usersByRole = action.payload.users || [];
         })

         // searchUsers
         .addCase(searchUsers.fulfilled, (state, action) => {
            state.searchResults = action.payload.users || [];
         });
   }
});

export const {
   clearCurrentUser,
   clearError,
   clearSearchResults,
   clearUsersByRole,
   setFilters,
   resetFilters,
   updateUserInList
} = userSlice.actions;

export default userSlice.reducer;