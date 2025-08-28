// store/selectors/memberSelectors.js
export const selectMembers = (state) => state.members.members;
export const selectCurrentMember = (state) => state.members.currentMember;
export const selectMemberLoading = (state) => state.members.loading;
export const selectMemberError = (state) => state.members.error;
export const selectMemberPagination = (state) => state.members.pagination;
export const selectMemberFilters = (state) => state.members.filters;

export const selectMemberById = (id) => (state) =>
   state.members.members.find(member => member._id === id);

export const selectMembersByStatus = (status) => (state) =>
   state.members.members.filter(member => member.status === status);

export const selectMembersByGym = (gymId) => (state) =>
   state.members.members.filter(member => member.gymId === gymId);

export const selectMembersByMembershipPlan = (planId) => (state) =>
   state.members.members.filter(member => member.membershipPlanId === planId);

export const selectActiveMembers = (state) =>
   state.members.members.filter(member => member.status === 'Active');

export const selectMembersWithUserData = (state) =>
   state.members.members.filter(member => member.userId && typeof member.userId === 'object');