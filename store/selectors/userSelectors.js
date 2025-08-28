// store/selectors/userSelectors.js
export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectUsersByRole = (state) => state.users.usersByRole;
export const selectUserSearchResults = (state) => state.users.searchResults;
export const selectUserLoading = (state) => state.users.loading;
export const selectUserError = (state) => state.users.error;
export const selectUserPagination = (state) => state.users.pagination;
export const selectUserFilters = (state) => state.users.filters;

export const selectUserById = (id) => (state) =>
   state.users.users.find(user => user._id === id);

export const selectUsersByStatus = (status) => (state) =>
   state.users.users.filter(user => user.status === status);

export const selectUsersByGym = (gymId) => (state) =>
   state.users.users.filter(user => user.gym_id === gymId);

export const selectActiveUsers = (state) =>
   state.users.users.filter(user => user.status === 'Active');

export const selectAdmins = (state) =>
   state.users.users.filter(user => user.user_role === 'Admin');

export const selectMembers = (state) =>
   state.users.users.filter(user => user.user_role === 'Member');

export const selectTrainers = (state) =>
   state.users.users.filter(user => user.user_role === 'Trainer');

export const selectSuperAdmins = (state) =>
   state.users.users.filter(user => user.user_role === 'SuperAdmin');