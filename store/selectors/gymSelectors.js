// store/selectors/gymSelectors.js
export const selectGyms = (state) => state.gyms.gyms;
export const selectCurrentGym = (state) => state.gyms.currentGym;
export const selectActiveGym = (state) => state.gyms.activeGym;
export const selectGymLoading = (state) => state.gyms.loading;
export const selectGymError = (state) => state.gyms.error;
export const selectGymPagination = (state) => state.gyms.pagination;
export const selectGymFilters = (state) => state.gyms.filters;

export const selectGymById = (id) => (state) =>
   state.gyms.gyms.find(gym => gym._id === id);

export const selectGymsByStatus = (status) => (state) =>
   state.gyms.gyms.filter(gym => gym.status === status);

export const selectGymsByOwner = (ownerId) => (state) =>
   state.gyms.gyms.filter(gym => gym.ownerUserId === ownerId);

export const selectGymBySubdomain = (subdomain) => (state) =>
   state.gyms.gyms.find(gym => gym.subdomain === subdomain);