// services/userApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const userApi = {
   // Get all users with pagination and filtering
   getUsers: async ({ page = 1, limit = 20, q = '', role = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ page, limit, q, role });
         const response = await axiosInstance.get(`/users/get-all-users${queryParams}`);
         return response.data.data; // { users, pagination }
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get user by ID
   getUserById: async (id) => {
      try {
         const response = await axiosInstance.get(`/users/get-user-by-id?id=${id}`);
         return response.data.data.user;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update user
   updateUser: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/users/update-user?id=${id}`, updateData);
         return response.data.data.user;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete user (if you have this endpoint)
   deleteUser: async (id) => {
      try {
         const response = await axiosInstance.delete(`/users?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get users by role
   getUsersByRole: async (role) => {
      try {
         const response = await axiosInstance.get(`/users/by-role?role=${role}`);
         return response.data.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Search users
   searchUsers: async (query) => {
      try {
         const response = await axiosInstance.get(`/users/search?q=${encodeURIComponent(query)}`);
         return response.data.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};