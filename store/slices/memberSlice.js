// store/slices/memberSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { memberApi } from '@/services/memberApi';

// Async thunks
export const createMember = createAsyncThunk(
   'members/create',
   async (memberData, { rejectWithValue }) => {
      try {
         return await memberApi.createMember(memberData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchMembers = createAsyncThunk(
   'members/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await memberApi.getMembers(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchMemberById = createAsyncThunk(
   'members/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         return await memberApi.getMemberById(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateMember = createAsyncThunk(
   'members/update',
   async ({ id, updateData }, { rejectWithValue }) => {
      try {
         return await memberApi.updateMember(id, updateData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteMember = createAsyncThunk(
   'members/delete',
   async (id, { rejectWithValue }) => {
      try {
         return await memberApi.deleteMember(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   members: [],
   currentMember: null,
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
      status: ''
   }
};

const memberSlice = createSlice({
   name: 'members',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null;
      },
      clearCurrentMember: (state) => {
         state.currentMember = null;
      },
      setFilters: (state, action) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      resetFilters: (state) => {
         state.filters = { gymId: '', q: '', status: '' };
      },
      // Special action to update a member in the list without refetching
      updateMemberInList: (state, action) => {
         const updatedMember = action.payload;
         const index = state.members.findIndex(member => member._id === updatedMember._id);
         if (index !== -1) {
            state.members[index] = updatedMember;
         }
      }
   },
   extraReducers: (builder) => {
      builder
         // Create member
         .addCase(createMember.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createMember.fulfilled, (state, action) => {
            state.loading = false;
            state.members.unshift(action.payload.member);
         })
         .addCase(createMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch all members
         .addCase(fetchMembers.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMembers.fulfilled, (state, action) => {
            state.loading = false;
            state.members = action.payload.members;
            state.pagination = action.payload.pagination;
         })
         .addCase(fetchMembers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch member by ID
         .addCase(fetchMemberById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMemberById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentMember = action.payload.member;
         })
         .addCase(fetchMemberById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Update member
         .addCase(updateMember.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateMember.fulfilled, (state, action) => {
            state.loading = false;
            const updatedMember = action.payload.member;
            const index = state.members.findIndex(member => member._id === updatedMember._id);
            if (index !== -1) {
               state.members[index] = updatedMember;
            }
            if (state.currentMember && state.currentMember._id === updatedMember._id) {
               state.currentMember = updatedMember;
            }
         })
         .addCase(updateMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Delete member
         .addCase(deleteMember.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteMember.fulfilled, (state, action) => {
            state.loading = false;
            state.members = state.members.filter(member => member._id !== action.meta.arg);
            if (state.currentMember && state.currentMember._id === action.meta.arg) {
               state.currentMember = null;
            }
         })
         .addCase(deleteMember.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const {
   clearError,
   clearCurrentMember,
   setFilters,
   resetFilters,
   updateMemberInList
} = memberSlice.actions;

export default memberSlice.reducer;