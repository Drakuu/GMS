// services/membershipPlanApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const membershipPlanApi = {
   // Create a new membership plan
   createMembershipPlan: async (planData) => {
      try {
         const response = await axiosInstance.post('/membership-plans', planData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get all membership plans with pagination and filtering
   getMembershipPlans: async ({ gymId, page = 1, limit = 20, q = '', status = '', applicableTo = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ gymId, page, limit, q, status, applicableTo });
         const response = await axiosInstance.get(`/membership-plans${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get membership plan by ID
   getMembershipPlanById: async (id) => {
      try {
         const response = await axiosInstance.get(`/membership-plans/get-by-id?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update membership plan
   updateMembershipPlan: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/membership-plans/update?id=${id}`, updateData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete membership plan (if you have this endpoint)
   deleteMembershipPlan: async (id) => {
      try {
         const response = await axiosInstance.delete(`/membership-plans?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get featured plans for a gym
   getFeaturedPlans: async (gymId) => {
      try {
         const response = await axiosInstance.get(`/membership-plans/featured?gymId=${gymId}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get plans by applicability
   getPlansByApplicability: async (gymId, applicableTo) => {
      try {
         const response = await axiosInstance.get(`/membership-plans/by-applicability?gymId=${gymId}&applicableTo=${applicableTo}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};