// services/subscriptionPlanApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const subscriptionPlanApi = {
   // Create a new subscription plan
   createPlan: async (planData) => {
      try {
         const response = await axiosInstance.post('/subscription-plans/create', planData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get all subscription plans with pagination and filtering
   getPlans: async ({ page = 1, limit = 20, q = '', status = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ page, limit, q, status });
         const response = await axiosInstance.get(`/subscription-plans/get-all${queryParams}`);
         console.log('Fetched plans:', response.data); // Debug log
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get a single subscription plan by ID
   getPlanById: async (id) => {
      try {
         const response = await axiosInstance.get(`/subscription-plans/get-by-id?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update a subscription plan
   updatePlan: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/subscription-plans/update?id=${id}`, updateData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete a subscription plan (if you have this endpoint)
   deletePlan: async (id) => {
      try {
         const response = await axiosInstance.delete(`/subscription-plans?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get active plans (custom method if needed)
   getActivePlans: async () => {
      try {
         const response = await axiosInstance.get('/subscription-plans?status=active');
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};