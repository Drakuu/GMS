// store/selectors/membershipPlanSelectors.js
export const selectMembershipPlans = (state) => state.membershipPlans.plans;
export const selectCurrentMembershipPlan = (state) => state.membershipPlans.currentPlan;
export const selectFeaturedMembershipPlans = (state) => state.membershipPlans.featuredPlans;
export const selectMembershipPlanLoading = (state) => state.membershipPlans.loading;
export const selectMembershipPlanError = (state) => state.membershipPlans.error;
export const selectMembershipPlanPagination = (state) => state.membershipPlans.pagination;
export const selectMembershipPlanFilters = (state) => state.membershipPlans.filters;

export const selectMembershipPlanById = (id) => (state) =>
   state.membershipPlans.plans.find(plan => plan._id === id);

export const selectPlansByStatus = (status) => (state) =>
   state.membershipPlans.plans.filter(plan => plan.status === status);

export const selectPlansByGym = (gymId) => (state) =>
   state.membershipPlans.plans.filter(plan => plan.gymId === gymId);

export const selectPlansByApplicability = (applicableTo) => (state) =>
   state.membershipPlans.plans.filter(plan =>
      plan.applicableTo && plan.applicableTo.includes(applicableTo)
   );

export const selectActivePlans = (state) =>
   state.membershipPlans.plans.filter(plan => plan.status === 'Active');

export const selectFeaturedPlans = (state) =>
   state.membershipPlans.plans.filter(plan => plan.isFeatured);

export const selectMemberPlans = (state) =>
   state.membershipPlans.plans.filter(plan =>
      plan.applicableTo && plan.applicableTo.includes('member')
   );

export const selectTrainerPlans = (state) =>
   state.membershipPlans.plans.filter(plan =>
      plan.applicableTo && plan.applicableTo.includes('trainer')
   );