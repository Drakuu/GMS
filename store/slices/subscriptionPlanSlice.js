// store/slices/subscriptionPlanSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subscriptionPlanApi } from '@/services/subscriptionPlanApi';

// Async thunks
export const createSubscriptionPlan = createAsyncThunk(
   'subscriptionPlans/create',
   async (planData, { rejectWithValue }) => {
      try {
         return await subscriptionPlanApi.createPlan(planData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchSubscriptionPlans = createAsyncThunk(
   'subscriptionPlans/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await subscriptionPlanApi.getPlans(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchSubscriptionPlanById = createAsyncThunk(
   'subscriptionPlans/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         return await subscriptionPlanApi.getPlanById(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateSubscriptionPlan = createAsyncThunk(
   'subscriptionPlans/update',
   async ({ id, updateData }, { rejectWithValue }) => {
      try {
         return await subscriptionPlanApi.updatePlan(id, updateData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteSubscriptionPlan = createAsyncThunk(
   'subscriptionPlans/delete',
   async (id, { rejectWithValue }) => {
      try {
         return await subscriptionPlanApi.deletePlan(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   plans: [],
   currentPlan: null,
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

const subscriptionPlanSlice = createSlice({
   name: 'subscriptionPlans',
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
         state.filters = { q: '', status: '' };
      }
   },
   extraReducers: (builder) => {
      builder
         // Create plan
         .addCase(createSubscriptionPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.plans.unshift(action.payload.plan);
         })
         .addCase(createSubscriptionPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch all plans
         .addCase(fetchSubscriptionPlans.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = action.payload.plans;
            state.pagination = action.payload.pagination;
         })
         .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch plan by ID
         .addCase(fetchSubscriptionPlanById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchSubscriptionPlanById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPlan = action.payload.plan;
         })
         .addCase(fetchSubscriptionPlanById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Update plan
         .addCase(updateSubscriptionPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
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
         .addCase(updateSubscriptionPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Delete plan
         .addCase(deleteSubscriptionPlan.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
            state.loading = false;
            state.plans = state.plans.filter(plan => plan._id !== action.meta.arg);
            if (state.currentPlan && state.currentPlan._id === action.meta.arg) {
               state.currentPlan = null;
            }
         })
         .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const {
   clearError,
   clearCurrentPlan,
   setFilters,
   resetFilters
} = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;