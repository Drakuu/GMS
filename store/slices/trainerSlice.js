// store/slices/trainerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trainerApi } from '@/services/trainerApi';

// Async thunks
export const createTrainer = createAsyncThunk(
   'trainers/create',
   async (trainerData, { rejectWithValue }) => {
      try {
         return await trainerApi.createTrainer(trainerData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchTrainers = createAsyncThunk(
   'trainers/fetchAll',
   async (params = {}, { rejectWithValue }) => {
      try {
         return await trainerApi.getTrainers(params);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchTrainerById = createAsyncThunk(
   'trainers/fetchById',
   async (id, { rejectWithValue }) => {
      try {
         return await trainerApi.getTrainerById(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const updateTrainer = createAsyncThunk(
   'trainers/update',
   async ({ id, updateData }, { rejectWithValue }) => {
      try {
         return await trainerApi.updateTrainer(id, updateData);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteTrainer = createAsyncThunk(
   'trainers/delete',
   async (id, { rejectWithValue }) => {
      try {
         return await trainerApi.deleteTrainer(id);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const assignMemberToTrainer = createAsyncThunk(
   'trainers/assignMember',
   async ({ trainerId, memberId }, { rejectWithValue }) => {
      try {
         return await trainerApi.assignMemberToTrainer(trainerId, memberId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const removeMemberFromTrainer = createAsyncThunk(
   'trainers/removeMember',
   async ({ trainerId, memberId }, { rejectWithValue }) => {
      try {
         return await trainerApi.removeMemberFromTrainer(trainerId, memberId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchTrainersBySpecialization = createAsyncThunk(
   'trainers/fetchBySpecialization',
   async ({ gymId, specialization }, { rejectWithValue }) => {
      try {
         return await trainerApi.getTrainersBySpecialization(gymId, specialization);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchAvailableTrainers = createAsyncThunk(
   'trainers/fetchAvailable',
   async (gymId, { rejectWithValue }) => {
      try {
         return await trainerApi.getAvailableTrainers(gymId);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const initialState = {
   trainers: [],
   currentTrainer: null,
   availableTrainers: [],
   specializedTrainers: [], // Changed from trainersBySpecialization
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
      specialization: ''
   }
};


const trainerSlice = createSlice({
   name: 'trainers',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null;
      },
      clearCurrentTrainer: (state) => {
         state.currentTrainer = null;
      },
      clearAvailableTrainers: (state) => {
         state.availableTrainers = [];
      },
      // Update the clear action
      clearSpecializedTrainers: (state) => {
         state.specializedTrainers = [];
      },
      setFilters: (state, action) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      resetFilters: (state) => {
         state.filters = { gymId: '', q: '', status: '', specialization: '' };
      },
      // Special action to update a trainer in the list without refetching
      updateTrainerInList: (state, action) => {
         const updatedTrainer = action.payload;
         const index = state.trainers.findIndex(trainer => trainer._id === updatedTrainer._id);
         if (index !== -1) {
            state.trainers[index] = updatedTrainer;
         }
      },
      // Action to add/remove members from trainer locally
      updateTrainerMembers: (state, action) => {
         const { trainerId, memberId, action: operation } = action.payload;
         const trainer = state.trainers.find(t => t._id === trainerId);
         if (trainer) {
            if (operation === 'add') {
               if (!trainer.assignedMembers.includes(memberId)) {
                  trainer.assignedMembers.push(memberId);
               }
            } else if (operation === 'remove') {
               trainer.assignedMembers = trainer.assignedMembers.filter(id => id !== memberId);
            }
         }
      }
   },
   extraReducers: (builder) => {
      builder
         // Create trainer
         .addCase(createTrainer.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(createTrainer.fulfilled, (state, action) => {
            state.loading = false;
            state.trainers.unshift(action.payload.trainer);
         })
         .addCase(createTrainer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch all trainers
         .addCase(fetchTrainers.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTrainers.fulfilled, (state, action) => {
            state.loading = false;
            state.trainers = action.payload.trainers;
            state.pagination = action.payload.pagination;
         })
         .addCase(fetchTrainers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch trainer by ID
         .addCase(fetchTrainerById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTrainerById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentTrainer = action.payload.trainer;
         })
         .addCase(fetchTrainerById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Update trainer
         .addCase(updateTrainer.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(updateTrainer.fulfilled, (state, action) => {
            state.loading = false;
            const updatedTrainer = action.payload.trainer;
            const index = state.trainers.findIndex(trainer => trainer._id === updatedTrainer._id);
            if (index !== -1) {
               state.trainers[index] = updatedTrainer;
            }
            if (state.currentTrainer && state.currentTrainer._id === updatedTrainer._id) {
               state.currentTrainer = updatedTrainer;
            }
         })
         .addCase(updateTrainer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Delete trainer
         .addCase(deleteTrainer.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(deleteTrainer.fulfilled, (state, action) => {
            state.loading = false;
            state.trainers = state.trainers.filter(trainer => trainer._id !== action.meta.arg);
            if (state.currentTrainer && state.currentTrainer._id === action.meta.arg) {
               state.currentTrainer = null;
            }
         })
         .addCase(deleteTrainer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Assign member to trainer
         .addCase(assignMemberToTrainer.fulfilled, (state, action) => {
            const { trainerId, memberId } = action.meta.arg;
            const trainer = state.trainers.find(t => t._id === trainerId);
            if (trainer && !trainer.assignedMembers.includes(memberId)) {
               trainer.assignedMembers.push(memberId);
            }
            if (state.currentTrainer && state.currentTrainer._id === trainerId) {
               state.currentTrainer.assignedMembers.push(memberId);
            }
         })

         // Remove member from trainer
         .addCase(removeMemberFromTrainer.fulfilled, (state, action) => {
            const { trainerId, memberId } = action.meta.arg;
            const trainer = state.trainers.find(t => t._id === trainerId);
            if (trainer) {
               trainer.assignedMembers = trainer.assignedMembers.filter(id => id !== memberId);
            }
            if (state.currentTrainer && state.currentTrainer._id === trainerId) {
               state.currentTrainer.assignedMembers = state.currentTrainer.assignedMembers.filter(id => id !== memberId);
            }
         })

         // Fetch trainers by specialization
         .addCase(fetchTrainersBySpecialization.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTrainersBySpecialization.fulfilled, (state, action) => {
            state.loading = false;
            state.specializedTrainers = action.payload.trainers;
         })
         .addCase(fetchTrainersBySpecialization.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })

         // Fetch available trainers
         .addCase(fetchAvailableTrainers.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchAvailableTrainers.fulfilled, (state, action) => {
            state.loading = false;
            state.availableTrainers = action.payload.trainers;
         })
         .addCase(fetchAvailableTrainers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   }
});

export const {
   clearError,
   clearCurrentTrainer,
   clearAvailableTrainers,
   clearSpecializedTrainers,
   setFilters,
   resetFilters,
   updateTrainerInList,
   updateTrainerMembers
} = trainerSlice.actions;

export default trainerSlice.reducer;