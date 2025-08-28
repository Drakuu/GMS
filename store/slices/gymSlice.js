// store/slices/gymSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gymApi } from '@/services/gymApi';

// Async thunks
export const createGym = createAsyncThunk(
   'gyms/create',
   async (gymData, { rejectWithValue }) => {
      try {
         return await gymApi.createGym(gymData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchActiveGymByAdmin = createAsyncThunk(
   'gyms/fetchActiveByAdmin',
   async (adminId = null, { rejectWithValue }) => {
      try {
         return await gymApi.getActiveGymByAdmin(adminId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchAllGyms = createAsyncThunk(
   'gyms/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await gymApi.getAllGyms(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchGymById = createAsyncThunk(
   'gyms/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         return await gymApi.getGymById(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateGym = createAsyncThunk(
   'gyms/update',
   async ({ id, updateData }, { rejectWithValue }) => {
      try {
         return await gymApi.updateGym(id, updateData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteGym = createAsyncThunk(
   'gyms/delete',
   async (id, { rejectWithValue }) => {
      try {
         return await gymApi.deleteGym(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   gyms: [],
   currentGym: null,
   activeGym: null, // For admin's active gym
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
      status: ''
   }
};

const gymSlice = createSlice({
   name: 'gyms',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null;
      },
      clearCurrentGym: (state) => {
         state.currentGym = null;
      },
      clearActiveGym: (state) => {
         state.activeGym = null;
      },
      setFilters: (state, action) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      resetFilters: (state) => {
         state.filters = { q: '', status: '' };
      },
      setActiveGym: (state, action) => {
         state.activeGym = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder
         // Create gym
         .addCase(createGym.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createGym.fulfilled, (state, action) => {
            state.loading = false;
            state.gyms.unshift(action.payload.gym);
            state.activeGym = action.payload.gym; // Set as active gym after creation
         })
         .addCase(createGym.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch active gym by admin
         .addCase(fetchActiveGymByAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchActiveGymByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.activeGym = action.payload.gym;
         })
         .addCase(fetchActiveGymByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch all gyms
         .addCase(fetchAllGyms.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchAllGyms.fulfilled, (state, action) => {
            state.loading = false;
            state.gyms = action.payload.gyms;
            state.pagination = action.payload.pagination;
         })
         .addCase(fetchAllGyms.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch gym by ID
         .addCase(fetchGymById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchGymById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGym = action.payload.gym;
         })
         .addCase(fetchGymById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Update gym
         .addCase(updateGym.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateGym.fulfilled, (state, action) => {
            state.loading = false;
            const updatedGym = action.payload.gym;
            const index = state.gyms.findIndex(gym => gym._id === updatedGym._id);
            if (index !== -1) {
               state.gyms[index] = updatedGym;
            }
            if (state.currentGym && state.currentGym._id === updatedGym._id) {
               state.currentGym = updatedGym;
            }
            if (state.activeGym && state.activeGym._id === updatedGym._id) {
               state.activeGym = updatedGym;
            }
         })
         .addCase(updateGym.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Delete gym
         .addCase(deleteGym.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteGym.fulfilled, (state, action) => {
            state.loading = false;
            state.gyms = state.gyms.filter(gym => gym._id !== action.meta.arg);
            if (state.currentGym && state.currentGym._id === action.meta.arg) {
               state.currentGym = null;
            }
            if (state.activeGym && state.activeGym._id === action.meta.arg) {
               state.activeGym = null;
            }
         })
         .addCase(deleteGym.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const {
   clearError,
   clearCurrentGym,
   clearActiveGym,
   setFilters,
   resetFilters,
   setActiveGym
} = gymSlice.actions;

export default gymSlice.reducer;