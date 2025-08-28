// store/selectors/trainerSelectors.js
export const selectTrainers = (state) => state.trainers.trainers;
export const selectCurrentTrainer = (state) => state.trainers.currentTrainer;
export const selectAvailableTrainers = (state) => state.trainers.availableTrainers;
export const selectTrainersBySpecializationList = (state) => state.trainers.trainersBySpecialization;
export const selectTrainerLoading = (state) => state.trainers.loading;
export const selectTrainerError = (state) => state.trainers.error;
export const selectTrainerPagination = (state) => state.trainers.pagination;
export const selectTrainerFilters = (state) => state.trainers.filters;

export const selectTrainerById = (id) => (state) =>
   state.trainers.trainers.find(trainer => trainer._id === id);

export const selectTrainersByStatus = (status) => (state) =>
   state.trainers.trainers.filter(trainer => trainer.status === status);

export const selectTrainersByGym = (gymId) => (state) =>
   state.trainers.trainers.filter(trainer => trainer.gymId === gymId);

// Fixed: Renamed this selector to avoid conflict
export const selectTrainersWithSpecialization = (specialization) => (state) =>
   state.trainers.trainers.filter(trainer =>
      trainer.specialization && trainer.specialization.includes(specialization)
   );

export const selectActiveTrainers = (state) =>
   state.trainers.trainers.filter(trainer => trainer.status === 'Active');

export const selectTrainersWithAvailability = (state) =>
   state.trainers.trainers.filter(trainer =>
      trainer.availabilitySchedule && Object.keys(trainer.availabilitySchedule).length > 0
   );

export const selectTrainersWithAssignedMembers = (state) =>
   state.trainers.trainers.filter(trainer =>
      trainer.assignedMembers && trainer.assignedMembers.length > 0
   );

export const selectTrainerByUserId = (userId) => (state) =>
   state.trainers.trainers.find(trainer => trainer.userId === userId);

// Additional useful selectors
export const selectTrainerSpecializations = (state) => {
   const allSpecializations = state.trainers.trainers.flatMap(
      trainer => trainer.specialization || []
   );
   return [...new Set(allSpecializations)].sort();
};

export const selectTrainersWithHighRating = (minRating = 4) => (state) =>
   state.trainers.trainers.filter(trainer =>
      trainer.rating >= minRating
   );

export const selectTrainersByHourlyRate = (maxRate) => (state) =>
   state.trainers.trainers.filter(trainer =>
      trainer.hourlyRate <= maxRate
   );