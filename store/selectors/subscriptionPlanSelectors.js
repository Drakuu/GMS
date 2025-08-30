// store/selectors/subscriptionPlanSelectors.js

import { createSelector } from "@reduxjs/toolkit";

const rawFilters = (state) => state.subscriptionPlans.filters || {};

export const selectPlanFilters = createSelector(
   [
      (s) => rawFilters(s).page,
      (s) => rawFilters(s).limit,
      (s) => rawFilters(s).q,
      (s) => rawFilters(s).status,
   ],
   (page, limit, q, status) => ({
      page: Number.isFinite(+page) ? +page : 1,
      limit: Number.isFinite(+limit) ? +limit : 20,
      q: q ?? '',
      status: status ?? '',
   })
);


export const selectSubscriptionPlans = (state) => state.subscriptionPlans.plans;
export const selectCurrentPlan = (state) => state.subscriptionPlans.currentPlan;
export const selectPlanLoading = (state) => state.subscriptionPlans.loading;
export const selectPlanError = (state) => state.subscriptionPlans.error;
export const selectPlanPagination = (state) => state.subscriptionPlans.pagination;
// export const selectPlanFilters = (state) => state.subscriptionPlans.filters;

export const selectPlanById = (id) => (state) =>
   state.subscriptionPlans.plans.find(plan => plan._id === id);

export const selectActivePlans = (state) =>
   state.subscriptionPlans.plans.filter(plan => plan.status === 'active');

export const selectPlansByInterval = (interval) => (state) =>
   state.subscriptionPlans.plans.filter(plan => plan.interval === interval);