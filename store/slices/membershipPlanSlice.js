// store/slices/membershipPlanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { membershipPlanApi } from '@/services/membershipPlanApi';

// Async thunks
export const createMembershipPlan = createAsyncThunk(
   'membershipPlans/create',
   async (planData, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.createMembershipPlan(planData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchMembershipPlans = createAsyncThunk(
   'membershipPlans/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.getMembershipPlans(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchMembershipPlanById = createAsyncThunk(
   'membershipPlans/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.getMembershipPlanById(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateMembershipPlan = createAsyncThunk(
   'membershipPlans/update',
   async ({ id, updateData }, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.updateMembershipPlan(id, updateData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteMembershipPlan = createAsyncThunk(
   'membershipPlans/delete',
   async (id, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.deleteMembershipPlan(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchFeaturedPlans = createAsyncThunk(
   'membershipPlans/fetchFeatured',
   async (gymId, { rejectWithValue }) => {
      try {
         return await membershipPlanApi.getFeaturedPlans(gymId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   plans: [],
   currentPlan: null,
   featuredPlans: [],
   pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0
   },
   loading: false,
   error: null,
   filters: {
      gymId: '',
      q: '',
      status: '',
      applicableTo: ''
   }
};

const membershipPlanSlice = createSlice({
   name: 'membershipPlans',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null;
      },
      clearCurrentPlan: (state) => {
         state.currentPlan = null;
      },
      setFilters: (state, action) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      resetFilters: (state) => {
         state.filters = { gymId: '', q: '', status: '', applicableTo: '' };
      },
      // Special action to update a plan in the list without refetching
      updatePlanInList: (state, action) => {
         const updatedPlan = action.payload;
         const index = state.plans.findIndex(plan => plan._id === updatedPlan._id);
         if (index !== -1) {
            state.plans[index] = updatedPlan;
         }
      }
   },
   extraReducers: (builder) => {
      builder
         // Create plan
         .addCase(createMembershipPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createMembershipPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.plans.unshift(action.payload.plan);
         })
         .addCase(createMembershipPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch all plans
         .addCase(fetchMembershipPlans.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMembershipPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload.plans;
            state.pagination = action.payload.pagination;
         })
         .addCase(fetchMembershipPlans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch plan by ID
         .addCase(fetchMembershipPlanById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMembershipPlanById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPlan = action.payload.plan;
         })
         .addCase(fetchMembershipPlanById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Update plan
         .addCase(updateMembershipPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateMembershipPlan.fulfilled, (state, action) => {
            state.loading = false;
            const updatedPlan = action.payload.plan;
            const index = state.plans.findIndex(plan => plan._id === updatedPlan._id);
            if (index !== -1) {
               state.plans[index] = updatedPlan;
            }
            if (state.currentPlan && state.currentPlan._id === updatedPlan._id) {
               state.currentPlan = updatedPlan;
            }
         })
         .addCase(updateMembershipPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Delete plan
         .addCase(deleteMembershipPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteMembershipPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = state.plans.filter(plan => plan._id !== action.meta.arg);
            if (state.currentPlan && state.currentPlan._id === action.meta.arg) {
               state.currentPlan = null;
            }
         })
         .addCase(deleteMembershipPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch featured plans
         .addCase(fetchFeaturedPlans.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchFeaturedPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.featuredPlans = action.payload.plans;
         })
         .addCase(fetchFeaturedPlans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const {
   clearError,
   clearCurrentPlan,
   setFilters,
   resetFilters,
   updatePlanInList
} = membershipPlanSlice.actions;

export default membershipPlanSlice.reducer;