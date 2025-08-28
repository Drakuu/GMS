// services/gymApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const gymApi = {
   // Create a new gym
   createGym: async (gymData) => {
      try {
         const response = await axiosInstance.post('/gyms', gymData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get active gym by admin
   getActiveGymByAdmin: async (adminId = null) => {
      try {
         const queryParams = adminId ? buildQueryString({ adminId }) : '';
         const response = await axiosInstance.get(`/gyms/get-active-by-admin${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get all gyms (SuperAdmin only)
   getAllGyms: async ({ page = 1, limit = 20, q = '', status = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ page, limit, q, status });
         const response = await axiosInstance.get(`/gyms/get-all${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get gym by ID
   getGymById: async (id) => {
      try {
         const response = await axiosInstance.get(`/gyms/get-by-id?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update gym
   updateGym: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/gyms/update?id=${id}`, updateData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete gym (if you have this endpoint)
   deleteGym: async (id) => {
      try {
         const response = await axiosInstance.delete(`/gyms?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get gym by subdomain (if you have this endpoint)
   getGymBySubdomain: async (subdomain) => {
      try {
         const response = await axiosInstance.get(`/gyms/by-subdomain?subdomain=${subdomain}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};