// hooks/useSubscriptionPlans.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/store/slices/subscriptionPlanSlice';

export const useSubscriptionPlans = () => {
   const dispatch = useDispatch();

   const handleSearch = useCallback((term) => {
      dispatch(setFilters({ q: term, page: 1 }));
   }, [dispatch]);

   const handleSort = useCallback((sortBy) => {
      dispatch(setFilters({ sortBy, page: 1 }));
   }, [dispatch]);

   const handleStatusFilter = useCallback((status) => {
      dispatch(setFilters({ status, page: 1 }));
   }, [dispatch]);

   const handleDateFilter = useCallback((startDate, endDate) => {
      dispatch(setFilters({ startDate, endDate, page: 1 }));
   }, [dispatch]);

   return {
      handleSearch,
      handleSort,
      handleStatusFilter,
      handleDateFilter
   };
};